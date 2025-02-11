require('dotenv').config();
const Fastify = require('fastify');
const sequelize = require('./connectDB');

const app = Fastify({ logger: true });

app.register(require('./src/routes/user'));
app.register(require('./src/routes/todo'));

app.get('/', async (req, reply) => {
  return { message: 'Hello' };
});


const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    await sequelize.sync(); 

    await app.listen({ port: process.env.PORT });
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

// require('dotenv').config();
// const Fastify = require('fastify');
// const sequelize = require('./config/database');

// const app = Fastify({ logger: true });

// // Register routes
// app.register(require('./routes/userRoutes'));
// app.register(require('./routes/todoRoutes'));

// app.get('/', async (req, reply) => {
//   return { message: 'Welcome to the Mini To-Do API with Users!' };
// });

// // Connect to DB and start server
// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected successfully');

//     await sequelize.sync(); // Sync models

//     await app.listen({ port: process.env.PORT });
//     console.log(`Server running on http://localhost:${process.env.PORT}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// start();
