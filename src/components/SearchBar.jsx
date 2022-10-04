import { useServiceOrders } from "../contexts/serviceOrdersContext";

function SearchBar() {
  const { setSearchInputText, setShowModalForm, setServiceOrderModal } =
    useServiceOrders();

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchInputText(lowerCase);
  };

  function handleClickAddServiceOrder() {
    setServiceOrderModal(null);
    setShowModalForm(true);
  }

  return (
    <div className="pt-5 pb-2 block w-full sm:flex sm:justify-between sm:items-center border-b border-gray-200">
      <div className="w-full max-w-sm">
        <form>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-3 pl-10 my-2 w-full text-sm text-gray-800 rounded-lg border border-gray-300"
              placeholder="Buscar ordens de serviço..."
              required
              onChange={inputHandler}
            />
          </div>
        </form>
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
