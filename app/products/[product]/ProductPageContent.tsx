import {
  Product,
} from "@shopify/hydrogen-react/storefront-api-types";
import React, { FC } from "react";

type Props = {
  product: Partial<Product>;
};

const ProductPageContent: FC<Props> = ({ product }) => {
  const { title } = product;
  return <div>{title}</div>;
};

export default ProductPageContent;
