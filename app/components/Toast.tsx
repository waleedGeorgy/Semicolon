import toast from "react-hot-toast";

export const createToast = (state: string, contents: string) => {
    const toastStyle = {
        style: {
            borderRadius: "16px",
            background: "#1b1b27",
            color: "#f5f5f5",
            border: "1px solid #6366f1",
        },
        duration: 4000,
    }

    switch (state) {
        case "error":
            return toast.error(contents, toastStyle);
        case "success":
            return toast.success(contents, toastStyle);
        default:
            break;
    }
};