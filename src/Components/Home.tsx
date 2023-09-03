import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateContactPage from "./CreateContactPage";
import CreateContactForm from "./CreateContactForm";
import { Link } from "react-router-dom";
import UpdateContact from "./UpdateContact";
import GraphAndMap from "./GraphAndMap";

const Home: React.FC = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="h-full">
      <div className="bg-blue-600 py-5 text-center">
        <p className="font-medium text-2xl text-white">
          {location.pathname === "/" ? "Contact Page" : "Graph and Map"}
        </p>
      </div>
      <div className="flex flex-wrap justify-center ">
        <div className="flex lg:flex-col lg:w-1/4">
          <div className=" lg:h-full flex lg:flex-col lg:w-3/4 lg:mb-0 mb-5 text-center pt-5">
            <p className="m-3 font-bold text-2xl text-blue-600">Navbar</p>
            <Link
              to="/"
              className={
                location.pathname === "/" ? "bg-blue-600 rounded-lg" : ""
              }
            >
              <button
                className={
                  location.pathname === "/"
                    ? "m-3 font-semibold text-xl text-white "
                    : "text-blue-600 m-3 font-semibold text-xl"
                }
              >
                Contact
              </button>
            </Link>
            <Link
              to="/graphandmap"
              className={
                location.pathname === "/graphandmap"
                  ? "bg-blue-600 rounded-lg"
                  : ""
              }
            >
              <button
                className={
                  location.pathname === "/graphandmap"
                    ? "m-3 font-semibold text-xl text-white "
                    : "text-blue-600 m-3 font-semibold text-xl"
                }
              >
                Graph And Map
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-4/6 flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/" element={<CreateContactPage />} />
            <Route path="/createcontact" element={<CreateContactForm />} />
            <Route path="/updatecontact" element={<UpdateContact />} />
            <Route path="/graphandmap" element={<GraphAndMap />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
