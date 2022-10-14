import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import ServiceOrdersContainer from "../components/ServiceOrdersContainer";
import TitlePage from "../components/TitlePage";
import Loading from "../components/Loading";
import { getAllServiceOrders } from "../modules/serviceOrder";
import ModalPreview from "../components/ModalPreview";
import ModalForm from "../components/ModalForm";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import SearchBar from "../components/SearchBar";
import ModalConfirm from "../components/ModalConfirm";
import { convertUSToBRDate } from "../helpers/utils";

function HomePage() {
  const {
    serviceOrders,
    setServiceOrders,
    loading,
    setLoading,
    showModalPreview,
    showModalForm,
    showModalConfirm,
    searchInputText,
    filteredServiceOrders,
    setFilteredServiceOrders,
    actionOnServiceOrder,
    setActionOnServiceOrder,
  } = useServiceOrders();

  async function getAllServiceOrdersFromApi() {
    let response = [];
    try {
      response = await getAllServiceOrders();
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setServiceOrders(response);
      setFilteredServiceOrders(response);
    }
  }

  function filterServiceOrdersBySearchInput(input) {
    const filteredData = serviceOrders.filter((serviceOrder) => {
      if (input === "") {
        return serviceOrder;
      } else {
        return (
          serviceOrder.bike.toLowerCase().includes(input) ||
          serviceOrder.client.toLowerCase().includes(input) ||
          serviceOrder.service.toLowerCase().includes(input) ||
          convertUSToBRDate(serviceOrder.created_at)
            .toLowerCase()
            .includes(input)
        );
      }
    });

    setFilteredServiceOrders(filteredData);
  }

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      getAllServiceOrdersFromApi();
      setActionOnServiceOrder(false);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [actionOnServiceOrder]);

  useEffect(() => {
    filterServiceOrdersBySearchInput(searchInputText);
  }, [searchInputText]);

  return (
    <>
      <TitlePage text="Ordens de Serviço" />
      <SearchBar />
      {loading ? (
        <Loading />
      ) : filteredServiceOrders ? (
        <ServiceOrdersContainer />
      ) : (
        <EmptyState msg="Ops, não foi encontrada nenhuma Ordem de Serviço!" />
      )}

      {showModalPreview && <ModalPreview />}
      {showModalForm && <ModalForm />}
      {showModalConfirm && <ModalConfirm />}
    </>
  );
}

export default HomePage;
