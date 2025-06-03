import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Weight {
    imperial: String
    metric: String
  }

  type Breed {
    weight: Weight
    id: String
    name: String
    temperament: String
    description: String
    life_span: String
  }

  type Cat {
    breeds: [Breed]
    id: String
    url: String
    width: Int
    height: Int
  }

  type Query {
    cats: [Cat]
  }
`;
