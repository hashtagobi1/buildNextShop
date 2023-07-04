import { gql, GraphQLClient } from "graphql-request";
import graphql from "graphql";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
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

  const data = await shopifyAPI(query);
  return data;
}

export async function getAllProducts() {
  type Products = {
    products: {
      edges: Partial<Product[]>;
    };
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

  const response: Products = await shopifyAPI(query);
  const slugs = response.products.edges ? response.products.edges : [];
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

  const product: Partial<Product> = await shopifyAPI(query);

  return product ?? [];
};
