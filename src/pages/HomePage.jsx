import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import ServiceOrdersContainer from "../components/ServiceOrdersContainer";
import TitlePage from "../components/TitlePage";
import Loading from "../components/Loading";
import { getAllServiceOrders } from "../modules/serviceOrder";
import Modal from "../components/Modal";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const {
    serviceOrders,
    setServiceOrders,
    loading,
    setLoading,
    showModal,
    searchInputText,
    filteredServiceOrders,
    setFilteredServiceOrders,
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
          serviceOrder.created_at.toLowerCase().includes(input)
        );
      }
    });

    setFilteredServiceOrders(filteredData);
  }

  useEffect(() => {
    getAllServiceOrdersFromApi();
    setLoading(false);
  }, []);

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

      {showModal && <Modal />}
    </>
  );
}

export default HomePage;
