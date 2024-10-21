import { ReactNode, Fragment } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { useFocusTrap } from "@mantine/hooks"
import CloseIcon from "../../icons/linear/CloseIcon";
import Button from "./Button";
import ArrowIcon from "../../icons/linear/ArrowIcon";

export interface ISheet {
  name: string;
  component: ReactNode;
}

export interface IActiveSheet {
  name: string;
  component: ReactNode;
}

interface IPanel{
  children: ReactNode;
}

interface IDrawer {
  mainSheet: ISheet;
  isOpen: boolean;
  activeSheets: IActiveSheet[];

}

const Sheet = ({ children }: IPanel ) => {
  const focusTrap= useFocusTrap();
  return (
    <div 
      className="bg-white rounded-3xl h-full"
      ref={focusTrap}
    >
      {children}
    </div>
  );
}

const Cover = () => {
  return (
    <div className="w-full h-full absolute z-50 bg-black/0 top-0" />
  )
}


export const Drawer = ({
  mainSheet,
  isOpen,
  activeSheets,
}: IDrawer) => {


  const generatePositionX = (activeSheets: number): string => {
    const position = activeSheets > 0 ? 20 + (activeSheets - 1) * 30 : 0;
    return `${position}%`;
  }

  const positionX = generatePositionX(activeSheets.length)

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.main
          className={`h-screen w-screen fixed top-0 right-0 bottom-0 left-0 z-[110]`}          
          layout
        >
          {/* The backdrop */}
          <motion.article 
            className={`h-screen w-screen bg-black/40 backdrop-blur-sm fixed z-[120]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          /> 
            {/* The drawer */}
            <motion.article 
              className={`h-screen w-screen fixed z-[140]`}
              layout
            >
              {/* The   */}
              <motion.section 
                className="w-full h-full flex items-center justify-end gap-2"
                animate={{ x: positionX }}
                transition={{ duration: 0.30, ease: "easeOut"}}
              > 
                <motion.div 
                  className="w-full h-full flex flex-row-reverse justify-start gap-6 py-8 pr-4"
                >
                  <AnimatePresence>
                    {activeSheets.map((sheet, index) => {
                      const isLast = index === activeSheets.length - 1;
                      return (
                        <motion.div 
                          key={index}
                          className=" w-[30vw] h-full z-40 flex-shrink-0 "
                          transition={{ duration: index > 0 ? 0.45 : 0.30,  ease: "easeOut" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Sheet>
                            {sheet.component}
                            {!isLast && <Cover />}
                          </Sheet>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className=" w-[30vw] flex-shrink-0 h-full py-8 pr-4 relative "
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.30 , ease: "easeInOut" }}
                >
                  <Sheet>
                    {mainSheet.component}
                    {activeSheets.length !== 0 && <Cover />}
                  </Sheet>
                </motion.div>

              </motion.section>
            </motion.article>
        </motion.main>
      )}
    </AnimatePresence>
  )
}

interface IDrawerHeader {
  title: string;
  handleClose: () => void;
  isLoading?: boolean;
}

export const DrawerHeader = ({
  title,
  handleClose,
  isLoading = false
}: IDrawerHeader ) => {
  return (
    <section className="flex justify-between border-b border-gray-200 px-6 py-4 w-full">
      <h1 className="text-xl font-medium text-gray-700">{title}</h1>
      <button 
        className="w-8 h-8" 
        onClick={handleClose} 
        type="button"
        disabled={isLoading}
      >
        <CloseIcon className="stroke-1 stroke-gray-500 w-full h-full" />
      </button> 
    </section>
  )
}

interface IDrawerFooter {
  handleClose: () => void;
  handleSubmit: (e: any) => void;
  step?: number;
  setStep?: (step: number) => void;
  isLoading?: boolean;
  isFinal?: boolean;
  type?: "form" | "sheet";
}


export const DrawerFooter = ({ 
    handleClose,
    handleSubmit,
    step,
    setStep,
    isLoading,
    isFinal,
    type = "form"
  }: IDrawerFooter ) => {


  return (
    <Fragment>
      {type === "form" ? (
        <section className="p-4 border-t border-gray-200 w-full">
          <div className="h-12 flex items-center justify-end gap-4 w-full px-6 ">
            <Button                   
              variant={isLoading ? "disabled" : "secondary"}
              onClick={handleClose}
              disabled={isLoading}
            >
              Close
            </Button>
            { step && step > 1 &&
              <div className="flex items-center justify-center gap-4">
                <div className="h-6 w-[1px] bg-gray-200" />
                <Button 
                  variant={isLoading ? "disabled" : "secondary"}
                  onClick={setStep ? ()=>setStep(step - 1) : () => {}}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              </div>
            }
            <Button 
              className="group w-24 flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              variant={isLoading ? "disabled" : "primary"}
              type={isFinal ? "submit":"button"} 
              onClick={isFinal ? ()=>{} : (e)=>handleSubmit(e)}
              disabled={isLoading}
            >            
              <div className="w-12 flex items-center justify-center transition-all duration-300 group group-hover:w-24">
                <p className="w-full text-center">{isFinal ? "Save" : "Next"}</p>
                <ArrowIcon className={`stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 ${isFinal ? " group-hover:w-0 ": " group-hover:w-6 "}`} />
              </div>
            </Button>
          </div>
        </section>
      ) : (
        <section className="p-4 border-t border-gray-200 w-full">
          <div className="h-12 flex items-center justify-end gap-4 w-full px-6 ">
            <Button                   
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button 
              onClick={handleSubmit}
              className="group w-24 flex items-center justify-center hover:animate-[width] duration-300 ease-in-out" 
              variant="primary"
            >            
              <div className="w-12 flex items-center justify-center transition-all duration-300 group group-hover:w-24">
                <p className="w-full text-center">Save</p>
                <ArrowIcon className={`stroke-2 stroke-white h-6 -rotate-90 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-0 `} />
              </div>
            </Button>
          </div>
        </section>
      )}
    </Fragment>
  )
}
