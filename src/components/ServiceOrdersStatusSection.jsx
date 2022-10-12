import { getColorByStatus } from "../helpers/service-status";
import ServiceOrderCard from "./ServiceOrderCard";

function ServiceOrdersStatusSection({ statusName, filteredServiceOrders }) {
  return (
    <div className="border-b border-gray-200">
      <h1 className="text-left font-bold text-md mt-5 mb-2 text-gray-700">
        Status {statusName}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-5 mb-8">
        {filteredServiceOrders.map((serviceOrder) => {
          return (
            <ServiceOrderCard
              key={serviceOrder.id}
              serviceOrder={serviceOrder}
              statusColor={getColorByStatus(statusName)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ServiceOrdersStatusSection;
