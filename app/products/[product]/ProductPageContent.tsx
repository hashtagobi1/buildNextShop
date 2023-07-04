import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import Image from "next/image";
import React, { FC } from "react";
import ProductForm from "./ProductForm";

type Props = {
  product: Partial<Product>;
};

const ProductPageContent: FC<Props> = ({ product }) => {
  const { title, images } = product;
  return (
    <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      <div className="w-full max-w-md-border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
        <div className="relative h-96 w-full">
          <Image
            className="object-cover"
            src={images?.edges[0].node.url ?? ""}
            alt={images?.edges[0].node.altText ?? ""}
            width={500}
            height={500}
          />
        </div>
      </div>
      <ProductForm />
    </div>
  );
};

export default ProductPageContent;
