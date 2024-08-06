import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components
import Loader from "../components/Loader";
import Error from "../components/Error";
import ComboProductCard from "../components/ComboProduct";
import { API_BASE_URL } from "../config";

const fetchComboProducts = async () => {
  const { data } = await axios.get(API_BASE_URL + "/combo-deals");
  return data;
};

const ComboDeal = () => {
  const {
    data: comboProducts,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ComboDeal"],
    queryFn: fetchComboProducts,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error errorMessage={error.message} />;
  }

  return (
    <div className="container flex gap-1 flex-wrap ">
      {/* <!-- component --> */}
      {comboProducts.data.comboProducts.map((comboProduct, index) => (
        <ComboProductCard comboProduct={comboProduct} key={comboProduct.id} />
      ))}
    </div>
  );
};

export default ComboDeal;
