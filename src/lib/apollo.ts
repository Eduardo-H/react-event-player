import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-us-east-1.graphcms.com/v2/cl5hijxy11d4n01ug6cbrcbyj/master',
  cache: new InMemoryCache()
});