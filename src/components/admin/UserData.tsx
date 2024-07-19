// UserData.tsx
import React, { useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { UserInterface } from "../../types/userInterface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserDataProps extends UserInterface {
  serialNo: number;
}

const UserData: React.FC<UserDataProps> = ({ serialNo, _id, name, email, isBlocked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .patch(ADMIN_API + `/block_user/${_id}`)
      .then(() => {
        toast.success(`User ${!isChecked ? "blocked" : "unblocked"} successfully!`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
      });
    setShowConfirm(false);
  };

  const toggleConfirmDialog = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap">
          {serialNo}
        </td>
        <td className="px-6 py-4 text-left">{name}</td>
        <td className="px-6 py-4 text-left">{email}</td>
        <td className="px-6 py-4 text-left">
          <button
            onClick={toggleConfirmDialog}
            className={`px-4 py-2 rounded-md focus:outline-none ${
              isChecked ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isChecked ? "Blocked" : "Block"}
          </button>
        </td>
      </tr>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-md shadow-md z-50">
            <h1 className="text-xl font-bold mb-4">Confirm Action</h1>
            <p className="mb-4">Are you sure you want to {isChecked ? "unblock" : "block"} this user?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCheckboxChange}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={toggleConfirmDialog}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserData;
