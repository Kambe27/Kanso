import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

let todos = [
  { id: '1', text: 'Embrace simplicity', completed: true },
  { id: '2', text: 'Connect frontend to backend', completed: false }
];

const typeDefs = `#graphql
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    addTodo(text: String!): Todo!
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    login: (_, { email, password }) => {
      const mockToken = Buffer.from(`${email}:kanso-auth`).toString('base64');
      return { token: mockToken };
    },
    addTodo: (_, { text }) => {
      const newTodo = { id: String(Date.now()), text, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find(t => t.id === id);
      if (todo) todo.completed = !todo.completed;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const initialLength = todos.length;
      todos = todos.filter(t => t.id !== id);
      return todos.length < initialLength; 
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Kanso Backend ready at: ${url}`);