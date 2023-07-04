import { getAllProducts, getProduct } from "../../lib/shopify";
import ProductPageContent from "./ProductPageContent";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => {
    handle: product.handle;
  });
}

const ProductPage = async ({ params }: any) => {
  const product = await getProduct(params.product);
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      {/* @ts-ignore */}
      <ProductPageContent product={product} />
    </div>
  );
};

export default ProductPage;
