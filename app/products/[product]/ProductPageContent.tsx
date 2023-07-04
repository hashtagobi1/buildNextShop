import {
  Product,
  ProductEdge,
} from "@shopify/hydrogen-react/storefront-api-types";
import React, { FC } from "react";

type Props = {
  product: Partial<ProductEdge>;
};

const ProductPageContent: FC<Props> = ({ product }) => {
  console.log(product);
  return <div>{product.node?.title}</div>;
};

export default ProductPageContent;
