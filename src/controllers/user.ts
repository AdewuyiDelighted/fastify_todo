import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/user"

 
    export const create_user = async (req:FastifyRequest,reply:FastifyReply) => {
    try {
       
      const { name, email } = req.body as { name: string; email: string };
        const found_user = await User.findOne({ where: { email } });        
        
        if(found_user){
            throw new Error("User Exist")
        }
        const created_user = await User.create({ name, email });
        return reply.code(201).send(created_user);
    
      } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }

}

  export const get_all_users = async (req:FastifyRequest,reply:FastifyReply) => {
    const users = await User.findAll();
    if(!users){
        throw new Error("No User Available")
    }
    return reply.send(users);
  }

  
  export const  get_user_by_id = async(req:FastifyRequest, reply:FastifyReply)=> {
    try {
      const { id } =  req.query as {id:string};      
      const found_user = await User.findOne({ where: { id:id } });        

      if (!found_user){
        throw new Error("No User Found")
      }
      return reply.send(found_user);
    
    } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }
}


  export const delete_user = async(req:FastifyRequest, reply:FastifyReply) => {
    try {
      const { id } = req.query as {id:string};
      const found_user = await User.findOne({ where: { id:id } });        

      if (!found_user){
        throw new Error("No User Found")
      }

      await found_user.destroy();
      return reply.send({ message: "User deleted successfully" });
    } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }
  }

