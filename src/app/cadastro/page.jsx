"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
const page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [register, setRegister] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/api/cadastro");
      setIsLoading(false);
      console.log(res.data);
      setRegister(res.data);
    }
    fetchData();
  }, []);

  const postUser = async (event) => {
    event.preventDefault();
    if (firstName != "" && lastName != "" && contact != "") {
      const newPost = {
        firstName,
        lastName,
        contact,
      };
      setRegister([newPost, ...register]);
      try {
        await axios.post("http://localhost:3000/api/cadastro", newPost);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Dados incompletos!");
    }
  };

  return (
    <div
      className="App flex flex-col items-center 
    justify-center gap-[50px] mt-[60px]"
    >
      <div>
        <form
          className="flex flex-col items-center gap-[30px]
         bg-white p-[30px] pt-[50px] pb-[50px] rounded-[30px]"
        >
          <h1 className="text-[20px] font-bold uppercase ">User Register</h1>
          <div className="inputContent  pl-[20px] pr-[20px]">
            <FaUser className="text-[14px] mr-[5px]" />
            <input
              className="w-[200px] h-[30px]"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name:"
            />
          </div>
          <div className="inputContent  pl-[20px] pr-[20px]">
            <FaUser className="text-[14px] mr-[5px]" />
            <input
              className="w-[200px] h-[30px]"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name:"
            />
          </div>
          <div className="inputContent  pl-[20px] pr-[20px]">
            <IoIosCall className="text-[18px] mr-[5px]" />
            <input
              className="w-[200px] h-[30px]"
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact:"
            />
          </div>
          <button
            className="text-[16px] text-white font-bold mt-[10px]
          bg-green-400 pt-[5px] pb-[5px] pl-[20px] pr-[20px]
          rounded-[30px] cursor-pointer transform hover:scale-[1.1]"
            onClick={postUser}
          >
            Enviar
          </button>
        </form>
        <div
          className="usuarios flex items-center justify-center flex-col
          mt-[50px]  text-[22px]
            pt-[20px] pb-[10px] bg-white rounded-[30px]
            "
        >
          <h2 className=" font-bold uppercase">User list</h2>
          <ul
            className="flex items-center justify-center flex-col
         text-[18px] 
            pt-[10px] pb-[10px] bg-white rounded-[30px]
          "
          >
            {isloading ? (
              <p>Loading...</p>
            ) : register && register.length > 0 ? (
              register.map((user, i) => (
                <li key={i} className="flex flex-col items-left max-w-[321px] ">
                  <p>----------------------------------------</p>

                  <p className=" overflow-hidden text-nowrap text-[18px]">
                    <span className="font-bold text-[14px]">First Name: </span>
                    {user.firstName}
                  </p>
                  <p className=" overflow-hidden text-nowrap text-[18px]">
                    <span className="font-bold text-[14px]">Last Name: </span>
                    {user.lastName}
                  </p>
                  <p className=" overflow-hidden text-nowrap text-[18px]">
                    <span className="font-bold text-[14px]">Contact: </span>{" "}
                    {user.contact}
                  </p>
                  <p>----------------------------------------</p>
                </li>
              ))
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
