
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="md:h-screen md:w-screen md:flex md:flex-col md:justify-between gc-text-black">
        <Header loginStatus={true} userName="RP" />
        <div className="w-full h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
