import { getProductsInCollection } from "./lib/shopify";

// headphones

export default async function Home() {
  const data = await getProductsInCollection();
  console.log(data.collection.products.edges);
  return (
    <div>
      <h1>
        {data.collection.products.edges.map((item: string, i: number) => (
          <h1 key={i}>{item.id}</h1>
        ))}
      </h1>
    </div>
  );
}
