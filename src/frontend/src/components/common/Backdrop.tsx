import { useFocusTrap } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";

interface IBackdrop {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Backdrop = ({ isOpen = false, onClose, children }: IBackdrop) => {
  const focusTrap = useFocusTrap();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={focusTrap}
          onClick={onClose}
          className="flex items-center justify-center bg-black/40 backdrop-blur-sm"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, // Changed from 'height' to 'bottom'
            zIndex: 100,
            width: "100vw",
            height: "100vh",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
