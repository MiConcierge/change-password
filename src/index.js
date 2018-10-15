import './index.css';

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'


const GRAPHCMS_API = 'https://api-staging.miconcierge.mx/graphql'

const httpLink = createHttpLink({
  uri: GRAPHCMS_API,
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token')
  if (!token) return { headers }
  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : null
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
