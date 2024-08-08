import { useEffect, useState } from "react";
import { UserInterface } from "../../types/userInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toast";
import { OwnerInterface } from "../../types/ownerInterface";


const useUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosJWT.get(ADMIN_API + "/users"  );
        const { users } = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
        showToast("Failed to fetch users", "error");
      }
    };

    fetchUsers();
  }, []);

  return { users };
};

export const useOwners = () => {
  const [owners, setOwners] = useState<OwnerInterface[]>([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axiosJWT.get(ADMIN_API + "/owners");
        const { owners } = response.data;

        setOwners(owners);
      } catch (error) {
        console.error(error);
        showToast("Failed to fetch owners", "error");
      }
    };

    fetchOwners();
  }, []);

  return { owners };
};

export default useUsers;
