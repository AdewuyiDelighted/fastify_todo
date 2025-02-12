
import { FastifyInstance } from "fastify";
import { create_user, delete_user, get_all_users, get_user_by_id } from "../controllers/user";


export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create_users", create_user);
  fastify.get("/get_all_users", get_all_users);
  fastify.get("/get_user_by_id", get_user_by_id);
  fastify.delete("/delete_user", delete_user);
}

