"use client";

import { formatter } from "@/app/utils/helpers";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import React, { useState } from "react";
import ProductOptions from "./ProductOptions";

type Props = {
  product: Partial<Product>;
};

type SelectedOptions = {
  name: string;
  value: string;
};

const ProductForm = ({ product }: Props) => {
  const allVariantOptions = product.variants?.edges?.map((variant) => {
    const allOptions = ({} as any) || ([] as any);

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: variant?.node?.product?.title,
      handle: variant?.node?.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQty: 1,
    };
  });
  const defaultValues = {} as any;
  product.options
    ? product.options.map((item) => {
        defaultValues[item.name] = item.values[0];
      })
    : null;

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions![0]);
  const [selectedOptions, setselectedOptions] = useState(defaultValues);
  function setOptions(name: string, value: any) {
    setselectedOptions((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {formatter.format(
          parseInt(product.variants?.edges[0]?.node?.price?.amount ?? "")
        )}
      </span>
      {product.options &&
        product.options.map(({ name, values }, i) => {
          return (
            <ProductOptions
              key={`key-${name}-${i}`}
              name={name}
              values={values}
              setOptions={setOptions}
              selectedOptions={selectedOptions}
            />
          );
        })}
      <button className="bg-black rounded-lg text-white px-2 py-3 hover:gray-800">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductForm;
