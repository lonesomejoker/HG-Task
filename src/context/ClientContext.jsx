import { message } from "antd";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (count) => {
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=${count}`
      );
      setProfile((prev) => [...prev, ...response.data.results]);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong while fetching users.");
    }
  };

  useEffect(() => {
    fetchData(6);
  }, []);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        fetchData(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <ClientContext.Provider
      value={{
        collapsed,
        setCollapsed,
        showModal,
        handleOk,
        handleCancel,
        confirmLoading,
        isMobile,
        setIsMobile,
        open,
        profile,
        loading,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

//custom hook
export const useClientContext = () => {
  const clientContextValue = useContext(ClientContext);
  if (!clientContextValue) {
    throw new Error("useClientContext used outside of the Provider ");
  }
  return clientContextValue;
};
