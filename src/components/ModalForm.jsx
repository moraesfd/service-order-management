import { useState } from "react";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { generateHashId } from "../helpers/utils";
import { createServiceOrder } from "../modules/serviceOrder";
import CurrencyInput from "react-currency-input-field";

function ModalForm() {
  const { setShowModalForm } = useServiceOrders();
  const [bike, setBike] = useState("");
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("aberto");

  async function handleSubmitForm() {
    const data = {
      id: generateHashId(),
      bike,
      client,
      service,
      description,
      price,
      status,
      created_at: new Date().toLocaleDateString("pt-BR"),
      updated_at: "",
    };

    let response = [];

    try {
      response = await createServiceOrder(data);
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setShowModalForm(false);
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">
                Criar Ordem de Serviço
              </h3>
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setShowModalForm(false)}
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
              <p className="my-4 text-slate-500 text-lg leading-relaxed text-left">
                <form
                  class="w-full max-w-lg"
                  onSubmit={() => handleSubmitForm()}
                >
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Bike
                      </label>
                      <input
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="bike"
                        type="text"
                        value={bike}
                        onChange={(e) => setBike(e.target.value)}
                        placeholder="Bike"
                        required
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Cliente
                      </label>
                      <input
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="client"
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        placeholder="Cliente"
                        required
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Serviço
                      </label>
                      <input
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="service"
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="Serviço"
                        required
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                      >
                        Descrição
                      </label>
                      <textarea
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição"
                      />
                    </div>
                  </div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-city"
                      >
                        Preço
                      </label>
                      <CurrencyInput
                        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        mask="R$ 9,99"
                        id="price"
                        type="text"
                        defaultValue={0}
                        value={price}
                        onValueChange={(value) => setPrice(value)}
                        decimalsLimit={2}
                        prefix={"R$ "}
                        groupSeparator={"."}
                        decimalSeparator={","}
                        placeholder="Preço"
                        required
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        Status
                      </label>
                      <div class="relative">
                        <select
                          class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          id="status"
                          required
                        >
                          <option value="aberto" selected>
                            Aberto
                          </option>
                          <option value="pendente">Pendente</option>
                          <option value="finalizado">Finalizado</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            class="fill-current h-4 w-4"
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
              </p>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-8 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalForm(false)}
              >
                Fechar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Salvar
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
