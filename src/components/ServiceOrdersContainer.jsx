import { getColorByStatus } from "../helpers/service-status";

function ServiceOrdersContainer({
  serviceOrders,
  setServiceOrderModal,
  setShowModal,
}) {
  function handleClickServiceOrder(serviceOrder) {
    setServiceOrderModal(serviceOrder);
    setShowModal(true);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 my-5">
      {serviceOrders.map((serviceOrder) => {
        const statusColor = getColorByStatus(serviceOrder.status);

        return (
          <div
            key={serviceOrder.id}
            onClick={(e) => handleClickServiceOrder(serviceOrder)}
            className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
          >
            <div className="px-6 py-4">
              <div className={`font-bold text-xl mb-2 ${statusColor}`}>
                {serviceOrder.status}
              </div>
              <div className="text-gray-700 text-base text-left">
                <strong>Bike: </strong>
                <span>{serviceOrder.bike}</span>
              </div>
              <div className="text-gray-700 text-base text-left">
                <strong>Cliente: </strong>
                <span>{serviceOrder.client}</span>
              </div>
              <div className="text-gray-700 text-base text-left">
                <strong>Serviço: </strong>
                <span>{serviceOrder.service}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceOrdersContainer;
