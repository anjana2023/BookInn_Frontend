import showToast, { ToastType } from "./toast";
import store from "../redux/store/store";
import { clearUser } from "../redux/slices/userSlice";
import { clearOwner } from "../redux/slices/ownerSlice";

const logout = (message: string, type: ToastType = "success"): void => {
  console.log('hiii')
  store.dispatch(clearUser());
  showToast(message, type);
};

 export const ownerlogout = (message: string, type: ToastType = "success"): void => {
  store.dispatch(clearOwner());
  showToast(message, type);
};

export default logout;