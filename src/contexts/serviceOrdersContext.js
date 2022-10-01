import { createContext, useContext, useState } from "react";

export const ServiceOrdersContext = createContext();

const DEFAULT_STATUS_LIST = ["aberto", "pendente", "finalizado"];

function ServiceOrdersProvider({ children }) {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);
  const [statusList, setStatusList] = useState(DEFAULT_STATUS_LIST);
  const [loading, setLoading] = useState(true);
  const [showModalPreview, setShowModalPreview] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [serviceOrderModal, setServiceOrderModal] = useState(null);
  const [searchInputText, setSearchInputText] = useState("");

  return (
    <ServiceOrdersContext.Provider
      value={{
        serviceOrders,
        setServiceOrders,
        filteredServiceOrders,
        setFilteredServiceOrders,
        statusList,
        setStatusList,
        loading,
        setLoading,
        showModalPreview,
        setShowModalPreview,
        showModalForm,
        setShowModalForm,
        serviceOrderModal,
        setServiceOrderModal,
        searchInputText,
        setSearchInputText,
      }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
}

export default ServiceOrdersProvider;

export const useServiceOrders = () => useContext(ServiceOrdersContext);
