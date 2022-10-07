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
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [serviceOrderModal, setServiceOrderModal] = useState(null);
  const [searchInputText, setSearchInputText] = useState("");
  const [actionOnServiceOrder, setActionOnServiceOrder] = useState(false);

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
        showModalConfirm,
        setShowModalConfirm,
        serviceOrderModal,
        setServiceOrderModal,
        searchInputText,
        setSearchInputText,
        actionOnServiceOrder,
        setActionOnServiceOrder,
      }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
}

export default ServiceOrdersProvider;

export const useServiceOrders = () => useContext(ServiceOrdersContext);
