import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl5hies3m1efi01t5c3tyagaz/master',
  cache: new InMemoryCache()
});