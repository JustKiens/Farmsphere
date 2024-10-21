import { useModalStore } from "../../stores/ModalStore";
import { useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../../components/common/DeleteModal";
import ProviderDataOutlet from "../../components/provider/outlets/ProviderDataOutlet"
import ProviderLayout from "../../layouts/ProviderLayout"
import { deleteStocks } from "../../services/ProviderServices";

const ProviderHomePage = () => {

  const queryClient = useQueryClient();

  const isOpen = useModalStore((state) => state.isOpen)
  const setIsOpen = useModalStore((state) => state.setOpen)
  const isLoading = useModalStore((state) => state.isLoading)
  const setIsLoading = useModalStore((state) => state.setIsLoading)
  const confirmation = useModalStore((state) => state.confirmation)
  const id = useModalStore((state) => state.id)

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteStocks(id);
      queryClient.invalidateQueries({ queryKey: ['providerStocksTableData']});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <ProviderLayout>
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Cancel Data"
        message="This action cannot be undone. This will permanently delete your data from our servers."
        confirmation={`CANCEL ${confirmation}`}
        handleSubmit={handleDelete}
        isLoading={isLoading}
        deleteMessage="Cancel"
      />
      <ProviderDataOutlet /> 
    </ProviderLayout>
  )
}

export default ProviderHomePage