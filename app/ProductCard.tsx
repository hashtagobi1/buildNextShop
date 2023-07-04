import Link from "next/link";
import Image from "next/image";
import { formatter } from "./utils/helpers";
import type { Product } from "@shopify/hydrogen-react/storefront-api-types";
type Props = {
  product: {
    node: Partial<Product>;
  };
};

export const ProductCard = ({ product }: Props) => {
  const { handle, title } = product.node;
  const altText = product.node.images?.edges[0]?.node.altText;
  const url = product.node.images?.edges[0]?.node.url;
  const amount = product?.node?.priceRange?.minVariantPrice.amount;
  const currencyCode = product?.node?.priceRange?.minVariantPrice.currencyCode;

  return (
    <Link className="group" href={`/products/${handle}`}>
      <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
        <div className="relative group-hover:opacity-75 h-72">
          <Image
            src={url ?? ""}
            alt={altText ?? ""}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-700">
        {formatter.format(parseInt(amount ?? ""))}
      </p>
    </Link>
  );
};
export default ProductCard;