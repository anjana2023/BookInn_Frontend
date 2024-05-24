import { useEffect, useState } from "react";
import { UserInterface } from "../../types/userInterface";
import axios from "axios";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toast";

axios.defaults.withCredentials = true;

const useUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(ADMIN_API + "/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
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
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get(ADMIN_API + "/owners", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const { users } = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
        showToast("Failed to fetch owners", "error");
      }
    };

    fetchOwners();
  }, []);

  return { users };
};

export default useUsers;
