import { toast as toastify } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = ({ title }: { title: string }) => {
  toastify(title);
};
