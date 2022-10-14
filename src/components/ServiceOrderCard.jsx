import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { convertUSToBRDate } from "../helpers/utils";

function ServiceOrderCard({ serviceOrder, statusColor }) {
  const { bike, client, service, responsible, status, created_at, updated_at } =
    serviceOrder;

  const {
    setServiceOrderModal,
    setShowModalPreview,
    setShowModalForm,
    setShowModalConfirm,
  } = useServiceOrders();

  function handleClickServiceOrderPreview() {
    setServiceOrderModal(serviceOrder);
    setShowModalPreview(true);
  }

  function handleClickServiceOrderEdit() {
    setServiceOrderModal(serviceOrder);
    setShowModalForm(true);
  }

  function handleClickServiceOrderDelete() {
    setServiceOrderModal(serviceOrder);
    setShowModalConfirm(true);
  }

  return (
    <div className="w-auto rounded overflow-hidden shadow-lg cursor-pointer">
      <div
        className="px-6 py-4"
        onClick={(e) => handleClickServiceOrderPreview()}
      >
        <div className={`font-bold uppercase text-xl mb-2 ${statusColor}`}>
          {status}
        </div>
        <div className="text-gray-700 text-base text-left">
          <strong>Bike: </strong>
          <span>{bike}</span>
        </div>
        <div className="text-gray-700 text-base text-left">
          <strong>Cliente: </strong>
          <span>{client}</span>
        </div>
        <div className="text-gray-700 text-base text-left">
          <strong>Serviço: </strong>
          <span>{service}</span>
        </div>
        {responsible && (
          <div className="text-gray-700 text-base text-left">
            <strong>Responsável: </strong>
            <span>{responsible}</span>
          </div>
        )}
        {status !== "finalizado" ? (
          <div className="text-gray-700 text-base text-left">
            <strong>Entrada em: </strong>
            <span>{convertUSToBRDate(created_at)}</span>
          </div>
        ) : (
          <div className="text-gray-700 text-base text-left">
            <strong>Finalizada em: </strong>
            <span>{convertUSToBRDate(updated_at)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-end px-2 py-4 relative bottom-0">
        <div className="text-right">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => handleClickServiceOrderEdit()}
          >
            <FiEdit />
            <span className="sr-only">Editar Item</span>
          </button>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={(e) => handleClickServiceOrderDelete()}
          >
            <FiTrash2 />
            <span className="sr-only">Excluir Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderCard;
