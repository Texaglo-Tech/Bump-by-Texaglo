import React, { useEffect } from "react";

//INTERNAL IMPORT
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Refer = ({ id }) => {
  const router = useRouter()

  useEffect(() => {
    console.log(id)
    localStorage.setItem("refer_id", id); 
    toast.success(`Thanks for referring!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    router.push("/login");
  }, []);

  return <></>;
};


export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default Refer;
