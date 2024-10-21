import { deleteProvider } from '../../services/AdminServices'
import { useModalStore } from '../../stores/ModalStore'
import { useQueryClient } from '@tanstack/react-query'
import AdminProviderOutlet from '../../components/admin/outlets/AdminProviderOutlet'
import DeleteModal from '../../components/common/DeleteModal'
import AdminLayout from '../../layouts/AdminLayout'

const AdminProviderPage = () => {


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
      await deleteProvider(id);
      queryClient.invalidateQueries({ queryKey: ['adminDisabledProviderTableData']});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }


  return (
    <AdminLayout>
      <DeleteModal 
        className="w-[32rem]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Delete Provider"
        message="This action cannot be undone. This will permanently delete your provider from our servers."
        confirmation={`DELETE ${confirmation}`}
        handleSubmit={handleDelete}
        isLoading={isLoading}
      />
      
      <AdminProviderOutlet />
    </AdminLayout>  
    )
}

export default AdminProviderPage