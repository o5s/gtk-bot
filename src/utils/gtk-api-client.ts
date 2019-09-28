import { GraphQLClient } from 'graphql-request';
import { sample } from 'lodash';

if (!process.env.FAUNADB_KEY_SECRET) {
  throw new Error('You need to have `FAUNADB_KEY_SECRET` configured');
}

const API_ENDPOINT = 'https://graphql.fauna.com/graphql';
const FAUNADB_KEY_SECRET = process.env.FAUNADB_KEY_SECRET;

interface Fact {
  text: string;
}

const client = new GraphQLClient(API_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${FAUNADB_KEY_SECRET}`,
  },
});

export async function getRandomFact(): Promise<string> {
  const query = `{
    allFacts {
      data {
        text
      }
    }
  }`;
  const {
    allFacts: { data },
  } = await client.request<{ allFacts: { data: Fact[] } }>(query);
  const fact = sample(data)!;

  return fact.text;
}

export default client;
