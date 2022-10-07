import { useServiceOrders } from "../contexts/serviceOrdersContext";
import { deleteServiceOrder } from "../modules/serviceOrder";

function ModalConfirm() {
  const {
    setShowModalConfirm,
    serviceOrderModal,
    setServiceOrderModal,
    setActionOnServiceOrder,
  } = useServiceOrders();

  function handleCloseModal() {
    setServiceOrderModal(null);
    setShowModalConfirm(false);
  }

  async function handleClickConfirmButton() {
    let response = [];

    try {
      response = await deleteServiceOrder(serviceOrderModal.id);
    } catch (error) {
      console.log(error);
      response = null;
    } finally {
      setActionOnServiceOrder(true);
      handleCloseModal();
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold text-gray-700">
                Excluir Ordem de Serviço
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
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <div className="text-gray-700 text-base text-center">
                  <strong>
                    Tem certeza que deseja excluir esta Ordem de Serviço?
                  </strong>
                </div>
              </p>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-8 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Cancelar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleClickConfirmButton()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalConfirm;
