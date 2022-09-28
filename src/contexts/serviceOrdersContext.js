import { createContext, useContext, useState } from "react";

export const ServiceOrdersContext = createContext();

const DEFAULT_STATUS_LIST = ["aberto", "pendente", "finalizado"];

function ServiceOrdersProvider({ children }) {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [statusList, setStatusList] = useState(DEFAULT_STATUS_LIST);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceOrderModal, setServiceOrderModal] = useState(null);

  return (
    <ServiceOrdersContext.Provider
      value={{
        serviceOrders,
        setServiceOrders,
        statusList,
        setStatusList,
        loading,
        setLoading,
        showModal,
        setShowModal,
        serviceOrderModal,
        setServiceOrderModal,
      }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
}

export default ServiceOrdersProvider;

export const useServiceOrders = () => useContext(ServiceOrdersContext);
