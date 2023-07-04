import ProductList from "./ProductList";
import { getProductsInCollection } from "./lib/shopify";
// headphones

export default async function Home() {
  const data = await getProductsInCollection();
  return (
    <div>
      <ProductList products={data.collection.products.edges}/>

        {/* {data.collection.products.edges.map((item: string, i: number) => {
          return <ProductList id={item.node.id} key={i} />;
        })} */}

    </div>
  );
}
