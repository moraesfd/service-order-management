import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import TitlePage from "../components/TitlePage";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { getSumArrayByKey } from "../helpers/utils";
import { getAllServiceOrders } from "../modules/serviceOrder";

function ReportPage() {
  const {
    serviceOrders,
    setServiceOrders,
    loading,
    setLoading,
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

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      getAllServiceOrdersFromApi();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TitlePage text="Relatórios" />
      <div className="py-6 block w-full sm:flex sm:justify-between sm:items-center border-b border-gray-200">
        <div className="block w-full sm:flex sm:justify-start sm:items-center">
          <div className="mb-6 md:mb-0 pr-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
              Filtrar por data:
            </label>
            <div className="flex justify-start items-center">
              <input
                className="appearance-none block w-30 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                name="date-from"
                id="date-from"
              />
              <span className="text-md px-5">até</span>
              <input
                className="appearance-none block w-30 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                name="date-to"
                id="date-to"
              />
            </div>
          </div>
          <div className="mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor="grid-state"
            >
              Status:
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full border border-gray-200 text-gray-700 text-sm py-3 px-4 pr-8 rounded leading-tight focus:outline
              -none focus:bg-white focus:border-gray-500"
                name="status"
              >
                <option value="todos">Todos</option>
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

        <div className="block mb-6 md:mb-0 w-auto">
          <button
            onClick={() => handleClickAddServiceOrder()}
            class="block bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded whitespace-nowrap"
          >
            Filtrar
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filteredServiceOrders ? (
        <div class="overflow-x-auto relative">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Bicicleta
                </th>
                <th scope="col" class="py-3 px-6">
                  Cliente
                </th>
                <th scope="col" class="py-3 px-6">
                  Serviço
                </th>
                <th scope="col" class="py-3 px-6">
                  Responsável
                </th>
                <th scope="col" class="py-3 px-6">
                  Status
                </th>
                <th scope="col" class="py-3 px-6">
                  Preço
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceOrders.map((serviceOrder, index) => (
                <tr class="bg-white dark:bg-gray-800">
                  <td class="py-4 px-6">{serviceOrder.bike}</td>
                  <td class="py-4 px-6">{serviceOrder.client}</td>
                  <td class="py-4 px-6">{serviceOrder.service}</td>
                  <td class="py-4 px-6">{serviceOrder.responsible}</td>
                  <td class="py-4 px-6">{serviceOrder.status}</td>
                  <td class="py-4 px-6">R$ {serviceOrder.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr class="font-semibold text-gray-900 dark:text-white">
                <th scope="row" class="py-3 px-6 text-base">
                  Total: {filteredServiceOrders.length}
                </th>
                <td class="py-3 px-6"></td>
                <td class="py-3 px-6"></td>
                <td class="py-3 px-6"></td>
                <td class="py-3 px-6"></td>
                <td class="py-3 px-6 text-base">
                  R$ {getSumArrayByKey(filteredServiceOrders, "price")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <EmptyState msg="Ops, selecione algum filtro para começar!" />
      )}
    </>
  );
}

export default ReportPage;
