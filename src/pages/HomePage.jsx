import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import ServiceOrdersContainer from "../components/ServiceOrdersContainer";
import TitlePage from "../components/TitlePage";
import Loading from "../components/Loading";
import { getAllServiceOrders } from "../modules/serviceOrder";
import Modal from "../components/Modal";
import { useServiceOrders } from "../contexts/serviceOrdersContext";

function HomePage() {
  const { serviceOrders, setServiceOrders, loading, setLoading, showModal } =
    useServiceOrders();

  async function getAllServiceOrdersFromApi() {
    let response = [];
    try {
      response = await getAllServiceOrders();
      setServiceOrders(response);
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setServiceOrders(response);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllServiceOrdersFromApi();
  }, []);

  const serviceOrdersFilteredByStatus = (status) => {
    let serviceOrdersFiltered = null;

    serviceOrdersFiltered = serviceOrders.filter((order) => {
      return order.status === status;
    });

    return serviceOrdersFiltered;
  };

  return (
    <>
      <TitlePage text="Ordens de Serviço" />
      {loading ? (
        <Loading />
      ) : serviceOrders ? (
        <ServiceOrdersContainer />
      ) : (
        <EmptyState msg="Ops, não foi encontrada nenhuma Ordem de Serviço!" />
      )}

      {showModal && <Modal />}
    </>
  );
}

export default HomePage;
