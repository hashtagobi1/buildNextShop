import { Product as ProductType } from "@shopify/hydrogen-react/storefront-api-types";
import { getAllProducts, getProduct } from "../../lib/shopify";
import ProductPageContent from "./ProductPageContent";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => {
    // console.log(product?.handle);
    handle: product?.handle;
  });
}

const ProductPage = async ({ params }: any) => {
  const product = await getProduct(params.product);
  return (
    <div>
      <ProductPageContent product={product} />
    </div>
  );
};

export default ProductPage;
