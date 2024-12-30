'use client'

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastOpts: ToastContainerProps = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

export default function ToastNotification() {
  const pathname = usePathname();

  return <ToastContainer {...toastOpts} />;
}
