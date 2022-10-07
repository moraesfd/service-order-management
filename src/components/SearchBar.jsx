import { useServiceOrders } from "../contexts/serviceOrdersContext";
import InputSearch from "./InputSearch";

function SearchBar() {
  const { setShowModalForm, setServiceOrderModal } = useServiceOrders();

  function handleClickAddServiceOrder() {
    setServiceOrderModal(null);
    setShowModalForm(true);
  }

  return (
    <div className="pt-5 pb-2 block w-full sm:flex sm:justify-between sm:items-center border-b border-gray-200">
      <div className="w-full max-w-sm">
        <InputSearch />
      </div>

      <div className="">
        <button
          onClick={() => handleClickAddServiceOrder()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          + ADD
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
