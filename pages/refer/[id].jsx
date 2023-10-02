import React, { useEffect } from "react";

//INTERNAL IMPORT
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Refer = () => {
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    localStorage.setItem("refer_id", id);
    toast.success(`Thanks for referring!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    router.push("/login");
  }, []);

  return <></>;
};

export default Refer;
