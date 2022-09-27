import { useServiceOrders } from "../contexts/serviceOrdersContext";

function ServiceOrderCard({ serviceOrder, statusColor }) {
  const { status, bike, client, service } = serviceOrder;

  const { setServiceOrderModal, setShowModal } = useServiceOrders();

  function handleClickServiceOrder() {
    setServiceOrderModal(serviceOrder);
    setShowModal(true);
  }

  return (
    <div
      onClick={(e) => handleClickServiceOrder()}
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
    >
      <div className="px-6 py-4">
        <div className={`font-bold text-xl mb-2 ${statusColor}`}>{status}</div>
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
      </div>
    </div>
  );
}

export default ServiceOrderCard;