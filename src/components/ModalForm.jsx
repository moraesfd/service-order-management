import { useEffect, useState } from "react";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { generateHashId } from "../helpers/utils";
import {
  createServiceOrder,
  updateServiceOrder,
} from "../modules/serviceOrder";
import CurrencyInput from "react-currency-input-field";

function ModalForm() {
  const {
    setShowModalForm,
    serviceOrderModal,
    setServiceOrderModal,
    setCreatedOrUpdatedServiceOrder,
  } = useServiceOrders();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentServiceOrder, setCurrentServiceOrder] = useState({
    id: serviceOrderModal?.id ?? generateHashId(),
    bike: serviceOrderModal?.bike ?? "",
    client: serviceOrderModal?.client ?? "",
    service: serviceOrderModal?.service ?? "",
    description: serviceOrderModal?.description ?? "",
    price: serviceOrderModal?.price ?? "",
    status: serviceOrderModal?.status ?? "aberto",
    created_at:
      serviceOrderModal?.created_at ?? new Date().toLocaleDateString("pt-BR"),
    updated_at: new Date().toLocaleDateString("pt-BR"),
  });

  const handleValue = (e) => {
    setCurrentServiceOrder({
      ...currentServiceOrder,
      [e.target.name]: e.target.value,
    });

    setErrorMsg("");
    setError(false);
  };

  function validateForm() {
    setErrorMsg("");
    setError(false);

    if (serviceOrderModal) {
      if (
        currentServiceOrder.bike === serviceOrderModal.bike &&
        currentServiceOrder.client === serviceOrderModal.client &&
        currentServiceOrder.service === serviceOrderModal.service &&
        currentServiceOrder.description === serviceOrderModal.description &&
        currentServiceOrder.price === serviceOrderModal.price &&
        currentServiceOrder.status === serviceOrderModal.status
      ) {
        setErrorMsg("Ops! Realize sua alteração desejada antes de salvar.");
        setError(true);
        return false;
      }
    }

    if (
      currentServiceOrder.bike === "" ||
      currentServiceOrder.client === "" ||
      currentServiceOrder.service === "" ||
      currentServiceOrder.price === ""
    ) {
      setErrorMsg("Ops! Preencha todos os campos obrigatótios para continuar.");
      setError(true);
      return false;
    } else {
      return true;
    }
  }

  function handleCloseModal() {
    setServiceOrderModal(null);
    setShowModalForm(false);
  }

  async function handleSubmitForm() {
    const validated = validateForm();

    if (validated) {
      let response = [];

      try {
        if (serviceOrderModal) {
          response = await updateServiceOrder(
            currentServiceOrder.id,
            currentServiceOrder
          );
        } else {
          response = await createServiceOrder(currentServiceOrder);
        }
      } catch (error) {
        console.log(error);
        response = null;
      } finally {
        setCreatedOrUpdatedServiceOrder(true);
        handleCloseModal();
      }
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">
                {serviceOrderModal ? "Editar " : "Adicionar "}
                Ordem de Serviço
              </h3>
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => handleCloseModal()}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative p-6 flex-auto">
              <div className="my-4 text-slate-500 text-lg leading-relaxed text-left">
                <form className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Bike <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="bike"
                        type="text"
                        value={currentServiceOrder.bike}
                        onChange={(e) => handleValue(e)}
                        placeholder="Bike"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Cliente <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="client"
                        type="text"
                        value={currentServiceOrder.client}
                        onChange={(e) => handleValue(e)}
                        placeholder="Cliente"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Serviço <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="service"
                        type="text"
                        value={currentServiceOrder.service}
                        onChange={(e) => handleValue(e)}
                        placeholder="Serviço"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Descrição
                      </label>
                      <textarea
                        className="appearance-none block w-full text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="description"
                        type="text"
                        value={currentServiceOrder.description}
                        onChange={(e) => handleValue(e)}
                        placeholder="Descrição"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        Preço <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="price"
                        value={currentServiceOrder.price}
                        onChange={(e) => handleValue(e)}
                        placeholder="Preço"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-state"
                      >
                        Status <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full border border-gray-200 text-gray-700 text-sm py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          value={currentServiceOrder.status}
                          onChange={(e) => handleValue(e)}
                          name="status"
                        >
                          <option value="aberto">Aberto</option>
                          <option value="pendente">Pendente</option>
                          <option value="finalizado">Finalizado</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {error && <p className="text-red-500 text-xs">{errorMsg}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-8 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Fechar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleSubmitForm()}
              >
                {serviceOrderModal ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalForm;
