// const UserController = require('../controllers/user');

// async function userRoutes(fastify, options) {
//   fastify.post('/create_users', UserController.create_user);
//   fastify.get('/get_all_users', UserController.get_all_users);
//   fastify.get('/get_user_by_id', UserController.get_user_by_id);
//   fastify.delete('/delete_user', UserController.delete_user);
// }


import { FastifyInstance } from "fastify";
import { create_user, delete_user, get_all_users, get_user_by_id } from "../controllers/user";
// import { userService } from "../../models/user.model";


export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create_users", create_user);
  fastify.get("/get_all_users", get_all_users);
  fastify.get("/get_user_by_id", get_user_by_id);
  fastify.delete("/delete_user", delete_user);
}

