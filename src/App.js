import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes";
import MainLayout from "./layouts/MainLayout";
import ServiceOrdersProvider from "./contexts/serviceOrdersContext";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ServiceOrdersProvider>
          <RoutesComponent />
        </ServiceOrdersProvider>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
