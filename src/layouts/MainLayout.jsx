import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <>
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">{children}</div>
      <Footer text="Todos os direitos reservados por Felipe de Moraes. 2022." />
    </>
  );
}

export default MainLayout;
