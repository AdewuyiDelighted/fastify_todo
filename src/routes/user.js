const UserController = require('../controllers/user');

async function userRoutes(fastify, options) {
  fastify.post('/create_users', UserController.create_user);
  fastify.get('/get_all_users', UserController.get_all_users);
  fastify.get('/get_user_by_id', UserController.get_user_by_id);
  fastify.delete('/delete_user', UserController.delete_user);
}

module.exports = userRoutes;