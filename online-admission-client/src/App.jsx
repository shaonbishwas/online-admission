import { Link, Outlet } from "react-router-dom";
import "./App.css";
import logo from "./assets/download.png";
function App() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto pt-2">
        <a href="https://uob.edu.bd/">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="">
        <Link to="/">
          <h1 className="text-xl md:text-4xl shadow-2xl animate w-2/4 md:p-20 p-10 border-black font-bold text-center my-5 mx-auto">
            Admission Fair Data Collection
          </h1>
        </Link>
      </div>
      <Outlet></Outlet>
      <footer className="text-center mt-20">
        <p className="font-bold ">Powered by</p>
        <p className="font-semibold text-gray-400">UoB Computer Club</p>
      </footer>
    </>
  );
}

export default App;
