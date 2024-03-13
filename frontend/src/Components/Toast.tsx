import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-100 rounded-md p-6 bg-green-600 text-white max-w-lg"
      : "fixed top-4 right-4 z-100 rounded-md p-6 bg-red-600 text-white max-w-lg";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center ">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
