import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { getColorByStatus } from "../helpers/service-status";
import { formatMoney } from "../helpers/utils";

function ModalPreview() {
  const { setShowModalPreview, serviceOrderModal } = useServiceOrders();
  const {
    bike,
    client,
    description,
    responsible,
    price,
    service,
    status,
    created_at,
    updated_at,
  } = serviceOrderModal;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">{bike}</h3>
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setShowModalPreview(false)}
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
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <div className="text-gray-700 text-base text-left">
                  <strong>Bike: </strong>
                  <span>{bike}</span>
                </div>
                <div className="text-gray-700 text-base text-left">
                  <strong>Cliente: </strong>
                  <span>{client}</span>
                </div>
                <div className="text-gray-700 text-base text-left">
                  <strong>Serviço: </strong>
                  <span>{service}</span>
                </div>
                <div className="text-gray-700 text-base text-left">
                  <strong>Descrição: </strong>
                  <span>{description}</span>
                </div>
                {responsible && (
                  <div className="text-gray-700 text-base text-left">
                    <strong>Responsável: </strong>
                    <span>{responsible}</span>
                  </div>
                )}
                <div className="text-gray-700 text-base text-left">
                  <strong>Status do serviço: </strong>
                  <span className={getColorByStatus(status)}>{status}</span>
                </div>
                <div className="text-gray-700 text-base text-left">
                  <strong>Preço: </strong>
                  <span>R$ {formatMoney(price)}</span>
                </div>
                <div className="text-gray-700 text-base text-left">
                  <strong>Entrada em: </strong>
                  <span>{created_at}</span>
                </div>
                {updated_at && (
                  <div className="text-gray-700 text-base text-left">
                    <strong>
                      {status !== "finalizado"
                        ? "Última alteração em: "
                        : "Finalizado em: "}
                    </strong>
                    <span>{updated_at}</span>
                  </div>
                )}
              </p>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-8 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalPreview(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalPreview;
