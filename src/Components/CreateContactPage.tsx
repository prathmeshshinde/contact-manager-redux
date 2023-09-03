import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/store";
import { useDispatch } from "react-redux";
import { deleteContact } from "../Redux/contactSlice";
import NotFound from "../images/result.jpg";

const CreateContactPage = () => {
  const dispatch = useDispatch();
  const contactsData = useSelector((store: RootState) => {
    return store;
  });

  const handleDelete = (id: any) => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {}, [contactsData]);

  return (
    <div className="flex w-screen flex-grow justify-center lg:mt-20 mb-10 ">
      <div className=" w-11/12  rounded-lg text-center border-2 border-sky-500  p-3 ">
        <Link to="/createcontact">
          <button className="bg-teal-400 p-3 rounded">Create Contact</button>
        </Link>

        <div className="">
          {contactsData.contacts.length === 0 ? (
            <div className="mt-10 ">
              <img alt="Not Found" src={NotFound} className=" h-96 m-auto" />
              <p className="  text-violet-500 font-bold text-xl">
                No Contact Found
              </p>
              <p className="text-orange-500 font-bold text-xl">
                Please Create Contacts
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4">
              {contactsData.contacts?.map((items, index) => {
                return (
                  <div className="lg:w-12/12 bg-cyan-500  py-4 rounded-lg m-2">
                    <p className="text-normal text-lg text-white">
                      First Name: {items.firstname}
                    </p>
                    <p className="text-normal text-lg text-white">
                      Last Name: {items.lastname}
                    </p>
                    <p className="text-normal text-lg text-white capitalize">
                      Status: {items.status}
                    </p>
                    <div className="mt-5">
                      <Link to="/updatecontact" state={{ items: items }}>
                        <button className="py-2 px-5 mx-3 bg-blue-700 text-white rounded-lg">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="py-2 px-5 mx-3 bg-red-600 text-white rounded-lg"
                        onClick={() => handleDelete(items.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContactPage;
