import toast from "react-hot-toast";

export const createToast = (state: string, contents: string) => {
    switch (state) {
        case "error":
            return toast.error(contents, {
                style: {
                    borderRadius: "16px",
                    background: "#1b1b27",
                    color: "#f5f5f5",
                    border: "1px solid #6366f1",
                },
                duration: 4000,
            });
        case "success":
            return toast.success(contents, {
                style: {
                    borderRadius: "16px",
                    background: "#1b1b27",
                    color: "#f5f5f5",
                    border: "1px solid #6366f1",
                },
                duration: 4000,
            });
        default:
            break;
    }
};