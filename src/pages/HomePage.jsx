import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import ServiceOrdersContainer from "../components/ServiceOrdersContainer";
import TitlePage from "../components/TitlePage";
import Loading from "../components/Loading";
import { getAllServiceOrders } from "../modules/serviceOrder";
import Modal from "../components/Modal";

function HomePage() {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceOrderModal, setServiceOrderModal] = useState(null);

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

  return (
    <>
      <TitlePage text="Ordens de Serviço" />
      {loading ? (
        <Loading />
      ) : serviceOrders ? (
        <ServiceOrdersContainer
          serviceOrders={serviceOrders}
          setServiceOrderModal={setServiceOrderModal}
          setShowModal={setShowModal}
        />
      ) : (
        <EmptyState msg="Ops, não foi encontrada nenhuma Ordem de Serviço!" />
      )}

      {showModal && (
        <Modal setShowModal={setShowModal} serviceOrder={serviceOrderModal} />
      )}
    </>
  );
}

export default HomePage;
