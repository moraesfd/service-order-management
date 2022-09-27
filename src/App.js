import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes";
import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import ServiceOrdersProvider from "./contexts/serviceOrdersContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header title="Gerenciamento de Ordens de Serviço" />
        <MainLayout>
          <ServiceOrdersProvider>
            <RoutesComponent />
          </ServiceOrdersProvider>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
