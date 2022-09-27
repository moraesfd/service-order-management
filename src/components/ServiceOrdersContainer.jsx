import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { getColorByStatus } from "../helpers/service-status";
import ServiceOrderCard from "./ServiceOrderCard";

function ServiceOrdersContainer() {
  const { serviceOrders } = useServiceOrders();

  const serviceOrdersOpened = serviceOrders.filter((order) => {
    return order.status === "aberto";
  });

  const serviceOrdersPending = serviceOrders.filter((order) => {
    return order.status === "pendente";
  });

  const serviceOrdersFinished = serviceOrders.filter((order) => {
    return order.status === "finalizado";
  });

  const serviceOrdersFiltered = [
    { status: "aberto", orders: serviceOrdersOpened ?? "" },
    { status: "pendente", orders: serviceOrdersPending ?? "" },
    { status: "finalizado", orders: serviceOrdersFinished ?? "" },
  ];

  return (
    <>
      {serviceOrdersFiltered.map((filtered, index) => {
        const id = index + 1;

        if (filtered.orders.length > 0) {
          return (
            <div key={id} className="border-b border-gray-200">
              <h1 className="text-left font-bold text-md mt-5 mb-2 text-gray-700">
                Status {filtered.status}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mt-5 mb-8">
                {filtered.orders.map((serviceOrder) => {
                  const statusColor = getColorByStatus(serviceOrder.status);

                  return (
                    <ServiceOrderCard
                      serviceOrder={serviceOrder}
                      statusColor={statusColor}
                      key={serviceOrder.id}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export default ServiceOrdersContainer;
