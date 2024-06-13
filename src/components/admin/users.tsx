import React, { useState } from "react";
import useUsers from "../../hooks/admin/useUsers";
import UserData from "./UserData";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Users: React.FC = () => {
  const { users } = useUsers();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="flex flex-col h-[80%] overflow-hidden">
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="Toastify__toast-container--center"
      />
      <div className="flex flex-col w-full flex-1">
        <div className="p-6 flex-1 ">
          <h1 className="text-2xl font-bold text-center mb-4">User List</h1>
          <div className="">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentUsers.map((user) => (
                  <UserData {...user} key={user._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="py-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center items-center space-x-2"}
            pageClassName={"px-3 py-1 border border-gray-300 text-gray-700 cursor-pointer"}
            activeClassName={"bg-gray-400 text-white"}
            previousClassName={"px-3 py-1 border border-gray-300 cursor-pointer"}
            nextClassName={"px-3 py-1 border border-gray-300 cursor-pointer"}
            disabledClassName={"cursor-not-allowed opacity-50"}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
