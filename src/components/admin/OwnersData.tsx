import { useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { UserInterface } from "../../types/userInterface";
import React from "react";

const UserData: React.FC<UserInterface> = ({ _id, name, email, isBlocked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle isChecked state
    // Update user's block status in the backend
    axiosJWT
      .patch(ADMIN_API + `/block_owner/${_id}`)
      .catch((err) => console.log(err));
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
        {_id}
      </td>
      <td className="px-6 py-4 text-left">{name}</td>
      <td className="px-6 py-4 text-left">{email}</td>
     
      <td className="px-6 py-4 text-left">
        <button
          onClick={handleCheckboxChange}
          className={`px-4 py-2 rounded-md focus:outline-none ${
            isChecked ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isChecked ? "Blocked" : "Block"}
        </button>
      </td>
    </tr>
  );
};

export default UserData;
