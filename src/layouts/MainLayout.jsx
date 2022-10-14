import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header title="Gerenciamento de Ordens de Serviço" />
      <Navigation />
      <main className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto text-center min-h-screen">
        {children}
      </main>
      <Footer text="Todos os direitos reservados por Felipe de Moraes. 2022." />
    </>
  );
}

export default MainLayout;
