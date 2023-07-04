import ProductList from "./ProductList";
import { getProductsInCollection } from "./lib/shopify";
// headphones

export default async function Home() {
  const data = await getProductsInCollection();
  return (
    <div>
      <ProductList products={data} />
    </div>
  );
}
