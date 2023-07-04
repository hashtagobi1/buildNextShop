import { gql, GraphQLClient } from "graphql-request";
import graphql from "graphql";
import {
  Product,
  Collection,
  ProductEdge,
} from "@shopify/hydrogen-react/storefront-api-types";
const domain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

const graphQLClient = new GraphQLClient(`https://${domain}/api//2023-07`, {
  // @ts-ignore
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});

const shopifyAPI = async (query: string, variables?: any) => {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

  const graphQLClient = new GraphQLClient(
    `https://${domain}/api//2023-07/graphql.json`,
    {
      // @ts-ignore
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
    }
  );

  return await graphQLClient.request(query, variables);
};

export async function getProductsInCollection() {
  type CollectionType = {
    collection: Partial<Collection>;
  };

  const query = gql`
    {
      collection(handle: "glisten-edition-✨") {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data: CollectionType = (await shopifyAPI(query)) as CollectionType;
  return data.collection.products?.edges;
}

export async function getAllProducts() {
  type Products = {
    products: Partial<ProductEdge>[];
  };
  const query = gql`
    {
      products(first: 250) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `;

  const response: Products = (await shopifyAPI(query)) as Products;
  const slugs = response.products ? response.products : [];
  return slugs;
}

export const getProduct = async (id: string) => {
  const query = gql`
    {
      product(handle: "${id}") {
        id
        title
        handle
        description
        options {
          name
          values
          id
        }
        variants(first: 25) {
          edges {
            node {
              selectedOptions {
                name
                value
              }
              title
              id
              price {
                amount
              }
              image {
                url
                altText
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const product: Partial<ProductEdge> = (await shopifyAPI(
    query
  )) as Partial<ProductEdge>;

  return product ?? [];
};
