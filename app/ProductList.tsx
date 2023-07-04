import type {
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import ProductCard from "./ProductCard";

type Props = {
  products: Partial<Product>[];
};
const ProductList = ({ products }: Props) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-60">Product</h2>
        <div
          className="grid grid-cols-1 gap-y-10 gap-x-6 
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
        >
          {products.map((product:any, i: number) => (
            <ProductCard product={product} key={product.node.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
