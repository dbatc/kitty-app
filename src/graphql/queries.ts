import { gql } from "@apollo/client";

export const GET_CATS = gql`
  query GetCats {
    cats {
      breeds {
        weight {
          imperial
          metric
        }
        id
        name
        temperament
        description
        life_span
      }
      id
      url
      width
      height
    }
  }
`;
