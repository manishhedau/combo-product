import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components
import Loader from "../components/Loader";
import Error from "../components/Error";
import ProductCard from "../components/ProductCard";
import { API_BASE_URL } from "../config";

const fetchProducts = async () => {
  const { data } = await axios.get(API_BASE_URL + "/products");
  return data;
};

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
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
      {products.data.products.map((product, index) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
