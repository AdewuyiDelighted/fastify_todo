import dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import {sequelize} from "./connectDB"
import userRoutes from "./routes/user";
import todoRoutes from "./routes/todo";

dotenv.config();

const app = Fastify({ logger: true });

app.register(userRoutes);
app.register(todoRoutes);

app.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
  return { message: "Hello" };
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();

    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.listen({ port: PORT, host: "0.0.0.0" }); 

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(" Error starting server:", err);
    process.exit(1);
  }
};

start();
// import { FastifyReply, FastifyRequest } from "fastify";

// require('dotenv').config();
// const Fastify = require('fastify');
// const sequelize = require('./connectDB');
// import userRoutes from "./routes/user";
// import todoRoutes from "./routes/todo";

// const app = Fastify({ logger: true });

// app.register(userRoutes);
// app.register(todoRoutes);

// app.get('/', async (req:FastifyRequest, reply:FastifyReply) => {
//   return { message: 'Hello' };
// });


// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected successfully');
    
//     await sequelize.sync(); 

//     await app.listen({ port: process.env.PORT });
//     console.log(`Server running on http://localhost:${process.env.PORT}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// start();