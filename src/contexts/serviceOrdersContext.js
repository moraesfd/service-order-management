import { createContext, ReactNode, useContext, useState } from "react";

export const ServiceOrdersContext = createContext();

function ServiceOrdersProvider({ children }) {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceOrderModal, setServiceOrderModal] = useState(null);

  return (
    <ServiceOrdersContext.Provider
      value={{
        serviceOrders,
        setServiceOrders,
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
