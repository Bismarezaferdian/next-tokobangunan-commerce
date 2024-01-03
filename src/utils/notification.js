import { toast } from "react-toastify";

export const successMessage = (message, onClose) => {
  // window.alert("Invalid Credentials");
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    onClose: onClose,
  });
};

export const errorMessage = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const infoMessage = (message, onClose) => {
  // window.alert("Invalid Credentials");
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    onClose: onClose,
  });
};
