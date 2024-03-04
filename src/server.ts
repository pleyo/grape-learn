import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
  context: (req) => {
    return {
      req,
    }
  },
})

const server = createServer(yoga)
export { server }; // Export the 'server' variable

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000;

server.listen(port, () => {
  console.log(`\
🚀 Server ready at: http://127.0.0.1:${port}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})