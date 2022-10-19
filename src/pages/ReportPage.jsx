import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
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

function ReportPage() {
  const { setServiceOrders, loading, setLoading, filteredServiceOrders } =
    useServiceOrders();

  async function getAllServiceOrdersFromApi() {
    let response = [];
    try {
      response = await getAllServiceOrders();
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setServiceOrders(response);
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
      <FilterBar />

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
              {filteredServiceOrders.map((serviceOrder, index) => {
                const id = index + 1;
                return (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
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
                );
              })}
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
