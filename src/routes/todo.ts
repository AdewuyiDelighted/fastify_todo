import { FastifyInstance } from "fastify";
import { create_todo, delete_todo, get_all_todos, get_todos_by_user, update_todo } from "../controllers/todo";


export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.post('/create_task', create_todo);
  fastify.get('/get_all_todos', get_all_todos);
  fastify.get('/get_todos_by_user',get_todos_by_user);
  fastify.put('/update_todo', update_todo);
  fastify.delete('/delete_todo', delete_todo);


}

