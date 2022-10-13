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
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
        >
          + Adicionar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
