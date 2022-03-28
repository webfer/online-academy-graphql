//console.log('Hola bienvenido a la academia!!!!');

import express from 'express';
import compresion from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import cors from 'cors';

import http from 'http';
import schema from './schema';

const PORT = 5200;
async function listen(PORT: number) {
  const app = express();

  app.use(cors());
  app.use(compresion());

  app.get('/', (req, res) => {
    res.send('Hola a la academia online en graphQL!!');
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer.listen(PORT).once('listening', resolve).once('error', reject);
  });
}

async function main() {
  try {
    await listen(PORT);
    console.log(
      `🚀 Bienvenido  a la academia Online en GraphQL http://localhost:${PORT}/graphql`
    );
  } catch (err) {
    console.error('💀 Error starting the node server', err);
  }
}

void main();
