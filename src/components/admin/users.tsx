import React from "react";
import useUsers from "../../hooks/admin/useUsers";
import UserData from "./UserData";



const Users: React.FC = () => {
  const { users } = useUsers();

  return (
    <div className="flex h-screen">

<div className="flex flex-col w-full">
      
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-4">User List</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white w-screen">
                {users.map((user) => {
                  return <UserData {...user} key={user._id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
  </div>
    </div>
  );
};



export default Users;
