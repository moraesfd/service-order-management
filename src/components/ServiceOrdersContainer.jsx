import { useServiceOrders } from "../contexts/serviceOrdersContext";
import ServiceOrdersStatusSection from "./ServiceOrdersStatusSection";

function ServiceOrdersContainer() {
  const { filteredServiceOrders, statusList } = useServiceOrders();

  return (
    <>
      {statusList.map((status, index) => {
        const id = index + 1;
        let serviceOrdersByStatus = [];
        serviceOrdersByStatus = filteredServiceOrders.filter((serviceOrder) => {
          return status === serviceOrder.status;
        });

        if (serviceOrdersByStatus.length > 0) {
          return (
            <ServiceOrdersStatusSection
              key={id}
              statusName={status}
              filteredServiceOrders={serviceOrdersByStatus}
            />
          );
        }
      })}
    </>
  );
}

export default ServiceOrdersContainer;
