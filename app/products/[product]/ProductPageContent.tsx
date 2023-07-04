import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import React, { FC } from "react";

type Props = {
  product: {
    product: Partial<Product>;
  };
};

const ProductPageContent: FC<Props> = ({ product }) => {
  console.log(product);
  return <div>{product.product.title}</div>;
};

export default ProductPageContent;
