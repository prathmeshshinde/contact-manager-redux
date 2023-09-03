import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Contact, addContact } from "../Redux/contactSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateContactForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Contact>({
    id: uuidv4(),
    firstname: "",
    lastname: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContact(data!));
    navigate("/");

    setData({ id: uuidv4(), firstname: "", lastname: "", status: "" });
  };

  return (
    <div className="flex w-screen flex-grow justify-center">
      <div className="w-11/12 lg:w-8/12">
        <p className="text-center">Create Contact Screen</p>
        <div className="w-full">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                First Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                placeholder="First Name"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastname"
              >
                Last Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Last Name"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
            <div className="mb-4 flex">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Status:
              </p>
              <div className="flex justify-around flex-grow">
                <div>
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    onChange={handleChange}
                    checked={data.status === "active"}
                    required
                  />
                  <label htmlFor="active" className="ml-2">
                    Active
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    onChange={handleChange}
                    checked={data.status === "inactive"}
                    required
                  />
                  <label htmlFor="inactive" className="ml-2">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-300 py-2 px-3 rounded-lg "
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContactForm;
