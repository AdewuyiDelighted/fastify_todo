import { User } from "../models/user"
import { Todo } from "../models/todo"
import { FastifyReply, FastifyRequest } from "fastify";
  
  export const  create_todo = async(req:FastifyRequest, reply:FastifyReply) => {
    try {
      const { description,title,userId, } = req.body as { description: string; title: string; userId:string};
      
      const found_user = await User.findOne({ where: { id:userId } });
      if (!found_user){
        throw new Error("No User Found")
      }

      const created_todo = await Todo.create({ title, description,userId });
      return reply.code(201).send(created_todo);

    } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }
  }

  export const get_all_todos = async(req:FastifyRequest, reply:FastifyReply) => {
   
    const todos = await Todo.findAll();
    
    if(!todos){
        throw new Error("No todo Available")
    }

    return reply.send(todos);
  }

  
  export const  get_todos_by_user = async(req:FastifyRequest, reply:FastifyReply) => {
    const { userId } = req.query as {userId:string} ;
  
    const found_user = await User.findOne({
      where: { id:userId },
      include: [{ model: Todo, as: 'Todos' }] 
    });
    
    if (!found_user){
      throw new Error("No User Found")
    }
    
    const userData = found_user.toJSON()
   

    return reply.send(userData.Todos);
  }


  export const  update_todo = async(req:FastifyRequest, reply:FastifyReply) => {
    try {
      
      const { title, description,is_completed,id} = req.body as { description: string; title: string; id:string,is_completed:boolean};
       const found_todo = await Todo.findOne({
        where: { id },
      });
     
       if (!found_todo){
          throw new Error("Todo Not Found")
        }

      found_todo.title = title !== undefined ? title : found_todo.title;
      found_todo.is_completed = is_completed !== undefined ? is_completed : found_todo.is_completed;
      found_todo.description = description !== undefined ? description : found_todo.description;

      await found_todo.save();
      return reply.send(found_todo);
    
    } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }
  }
  export const  delete_todo = async(req:FastifyRequest, reply:FastifyReply) => {
    try {
      const { id } = req.query as {id:string};
      
      const found_todo = await Todo.findOne({
        where: { id },
      });
          
       if (!found_todo){
          throw new Error("Todo Not Found")
       }

      await found_todo.destroy();
      return reply.send({ message: 'Todo deleted successfully' });
    } catch (err:any) {
      reply.code(400).send({ error: err.message });
    }
  }
 

