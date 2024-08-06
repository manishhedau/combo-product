import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// components
import ProductCard from "./ProductCard";
import Error from "./Error";
import { API_BASE_URL } from "../config";

const fetchComboProductById = async (id) => {
  const { data } = await axios.get(API_BASE_URL + `/combo-deals/${id}`);
  return data;
};

const ComboProductCard = ({ comboProduct }) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", comboProduct.id],
    queryFn: () => fetchComboProductById(comboProduct.id),
    enabled: false,
  });

  if (isError) {
    return <Error errorMessage={error.message} />;
  }

  return (
    <div className="w-full flex  items-center justify-between mx-10">
      <div className="flex w-full items-center justify-center flex-wrap">
        <ProductCard product={comboProduct.products[0]} />
        <div className="font-bold text-3xl">+</div>
        <ProductCard product={comboProduct.products[1]} />
      </div>
      <div className="gap-y-2">
        {data ? (
          <div className="rounded-lg bg-gray-100 flex items-center justify-around py-2 px-3 mb-2">
            <span className="font-bold text-indigo-600 text-3xl mr-2">
              ${data.data.discountedPrice}
            </span>
            <span className="font-bold text-indigo-600 text-xl line-through">
              {data.data.totalPrice}
            </span>
          </div>
        ) : null}

        {data ? null : (
          <button
            type="button"
            className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            onClick={() => refetch()}
          >
            {isLoading ? "Loading..." : "Get Discounted Price"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ComboProductCard;
