import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import TitlePage from "../components/TitlePage";
import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { getColorByStatus } from "../helpers/service-status";
import {
  convertUSToBRDate,
  exportPdf,
  formatUSDate,
  getSumArrayByKey,
} from "../helpers/utils";
import { getAllServiceOrders } from "../modules/serviceOrder";
import { AiOutlineFilter, AiOutlineDownload } from "react-icons/ai";

function ReportPage() {
  const {
    serviceOrders,
    setServiceOrders,
    loading,
    setLoading,
    filteredServiceOrders,
    setFilteredServiceOrders,
  } = useServiceOrders();

  const currentDate = formatUSDate(new Date());
  const [currentFilter, setCurrentFilter] = useState({
    dateFrom: currentDate,
    dateTo: currentDate,
    selectedStatus: "todos",
  });

  const handleChangeFilter = (e) => {
    setCurrentFilter({
      ...currentFilter,
      [e.target.name]: e.target.value,
    });
  };

  async function getAllServiceOrdersFromApi() {
    let response = [];
    try {
      response = await getAllServiceOrders();
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setServiceOrders(response);
      filterServiceOrders();
    }
  }

  function filterServiceOrders() {
    let filteredByData = [];
    let filteredByStatus = [];

    if (currentFilter.selectedStatus === "finalizado") {
      filteredByData = serviceOrders.filter((serviceOrder) => {
        return (
          new Date(serviceOrder.updated_at).getTime() >=
            new Date(currentFilter.dateFrom).getTime() &&
          new Date(serviceOrder.updated_at).getTime() <=
            new Date(currentFilter.dateTo).getTime()
        );
      });
    } else if (currentFilter.selectedStatus === "todos") {
      filteredByData = serviceOrders.filter((serviceOrder) => {
        return (
          (new Date(serviceOrder.created_at).getTime() >=
            new Date(currentFilter.dateFrom).getTime() &&
            new Date(serviceOrder.created_at).getTime() <=
              new Date(currentFilter.dateTo).getTime()) ||
          (serviceOrder.status === "finalizado" &&
            new Date(serviceOrder.updated_at).getTime() >=
              new Date(currentFilter.dateFrom).getTime() &&
            new Date(serviceOrder.updated_at).getTime() <=
              new Date(currentFilter.dateTo).getTime())
        );
      });
    } else {
      filteredByData = serviceOrders.filter((serviceOrder) => {
        return (
          new Date(serviceOrder.created_at).getTime() >=
            new Date(currentFilter.dateFrom).getTime() &&
          new Date(serviceOrder.created_at).getTime() <=
            new Date(currentFilter.dateTo).getTime()
        );
      });
    }

    if (filteredByData && filteredByData.length > 0) {
      if (currentFilter.selectedStatus === "todos") {
        filteredByStatus = filteredByData.filter((serviceOrder) => {
          return (
            serviceOrder.status.toLowerCase().includes("aberto") ||
            serviceOrder.status.toLowerCase().includes("pendente") ||
            serviceOrder.status.toLowerCase().includes("finalizado")
          );
        });
      } else {
        filteredByStatus = filteredByData.filter((serviceOrder) => {
          return serviceOrder.status
            .toLowerCase()
            .includes(currentFilter.selectedStatus);
        });
      }
    }

    setFilteredServiceOrders(filteredByStatus);
  }

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      getAllServiceOrdersFromApi();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function handleClickButtonFilter() {
    setLoading(true);

    setTimeout(() => {
      filterServiceOrders();
      setLoading(false);
    }, 1000);
  }

  function handleClickButtonDownload() {
    const filename = `lista_status_${currentFilter.selectedStatus}_de_${currentFilter.dateFrom}_ate_${currentFilter.dateTo}.pdf`;

    const title = `Relatório OS de status "${
      currentFilter.selectedStatus
    }" de ${convertUSToBRDate(currentFilter.dateFrom)} ate ${convertUSToBRDate(
      currentFilter.dateTo
    )}`;

    const headers = [
      [
        "Bicicleta",
        "Cliente",
        "Serviço",
        "Responsável",
        "Status",
        "Entrada",
        "Finalizado",
        "Preço",
      ],
    ];

    let data = filteredServiceOrders.map((serviceOrder) => [
      serviceOrder.bike,
      serviceOrder.client,
      serviceOrder.service,
      serviceOrder.responsible,
      serviceOrder.status,
      convertUSToBRDate(serviceOrder.created_at),
      serviceOrder.status === "finalizado"
        ? convertUSToBRDate(serviceOrder.updated_at)
        : "-",
      serviceOrder.price,
    ]);

    data = [
      ...data,
      [
        `Total: ${filteredServiceOrders.length}`,
        "",
        "",
        "",
        "",
        "",
        "",
        `${getSumArrayByKey(filteredServiceOrders, "price")}`,
      ],
    ];

    exportPdf(title, headers, data, filename);
  }

  return (
    <>
      <TitlePage text="Relatórios" />
      <div className="py-6 block w-full sm:flex sm:justify-between sm:items-center border-b border-gray-200">
        <div className="block w-full sm:flex sm:justify-start sm:items-center">
          <div className="mb-6 md:mb-0 md:pr-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
              Filtrar por data:
            </label>
            <div className="flex justify-start items-center">
              <input
                className="appearance-none block w-30 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                name="dateFrom"
                id="dateFrom"
                value={currentFilter.dateFrom}
                onChange={(e) => handleChangeFilter(e)}
              />
              <span className="text-md px-5">até</span>
              <input
                className="appearance-none block w-30 text-gray-700 text-sm border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                name="dateTo"
                id="dateTo"
                value={currentFilter.dateTo}
                onChange={(e) => handleChangeFilter(e)}
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
                name="selectedStatus"
                value={currentFilter.selectedStatus}
                onChange={(e) => handleChangeFilter(e)}
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

        <div className="flex justify-around mb-6 md:mb-0 md:mx-2 w-auto">
          <button
            onClick={() => handleClickButtonFilter()}
            className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded whitespace-nowrap md:mx-2"
          >
            <AiOutlineFilter />
            <span>Filtrar</span>
          </button>

          <button
            onClick={() => handleClickButtonDownload()}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded whitespace-nowrap"
          >
            <AiOutlineDownload />
            <span>Baixar</span>
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filteredServiceOrders && filteredServiceOrders.length > 0 ? (
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Bicicleta
                </th>
                <th scope="col" className="py-3 px-6">
                  Cliente
                </th>
                <th scope="col" className="py-3 px-6">
                  Serviço
                </th>
                <th scope="col" className="py-3 px-6">
                  Responsável
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Entrada
                </th>
                <th scope="col" className="py-3 px-6">
                  Finalizado
                </th>
                <th scope="col" className="py-3 px-6">
                  Preço
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceOrders.map((serviceOrder) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">{serviceOrder.bike}</td>
                  <td className="py-4 px-6">{serviceOrder.client}</td>
                  <td className="py-4 px-6">{serviceOrder.service}</td>
                  <td className="py-4 px-6">{serviceOrder.responsible}</td>
                  <td
                    className={`py-4 px-6 ${getColorByStatus(
                      serviceOrder.status
                    )}`}
                  >
                    {serviceOrder.status}
                  </td>
                  <td className="py-4 px-6">
                    {convertUSToBRDate(serviceOrder.created_at)}
                  </td>
                  <td className="py-4 px-6">
                    {serviceOrder.status === "finalizado"
                      ? convertUSToBRDate(serviceOrder.updated_at)
                      : "-"}
                  </td>
                  <td className="py-4 px-6">R$ {serviceOrder.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="py-3 px-6 text-base">
                  Total: {filteredServiceOrders.length}
                </th>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6"></td>
                <td className="py-3 px-6 text-base">
                  R$ {getSumArrayByKey(filteredServiceOrders, "price")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <EmptyState msg="Ops, não possui resultados para este filtro. Tente outro!" />
      )}
    </>
  );
}

export default ReportPage;
