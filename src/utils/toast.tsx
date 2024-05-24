import toast from "react-hot-toast";
export type ToastType = "success" | "error";
const showToast = (message: string, type: ToastType = "success") => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast.success(message);
      break;
  }
};

export default showToast;
