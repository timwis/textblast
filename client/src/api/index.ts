import { GraphQLClient } from 'graphql-request'

const API_ENDPOINT = process.env.API_ENDPOINT as string
const client = new GraphQLClient(API_ENDPOINT)

interface AuthenticatedUser {
  id: string
  token: string
  email: string
}

export async function authenticateUser (accessToken: String): Promise<AuthenticatedUser> {
  const mutation = `
    mutation ($accessToken: String!) {
      authenticateUser(
        accessToken: $accessToken
      ) {
        id
        token
        email
      }
    }
  `
  return client.request<{ authenticateUser: AuthenticatedUser }>(mutation, { accessToken })
    .then((response) => response.authenticateUser)
}
