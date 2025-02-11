const TodoController = require('../controllers/todo');

async function todoRoutes(fastify, options) {
  fastify.post('/create_task', TodoController.create_todo);
  fastify.get('/get_all_todos', TodoController.get_all_todos);
  fastify.get('/get_todos_by_user', TodoController.get_todos_by_user);
  fastify.put('/update_todo', TodoController.update_todo);
  fastify.delete('/delete_todo', TodoController.delete_todo);
}

module.exports = todoRoutes;