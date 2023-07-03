import { gql, GraphQLClient } from "graphql-request";
import graphql from "graphql";
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
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              handle
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAPI(query);
  return data
}

export const getProduct = async (id: string) => {
  const query = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
      }
    }
  `;
  console.log({ query });
  const data = await graphQLClient.request(query).then((res) => {
    return res;
  });

  return data;

};
