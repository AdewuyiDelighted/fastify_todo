const todo = require('../models/todo');
const user = require('../models/user');
const UserController = require('./user');

const TodoController = {
  
  async create_todo(req, reply) {
    try {
      const { description,title,userId, } = req.body;
      
      const found_user = await user.findOne({ where: { id:userId } });
      if (!found_user){
        throw new Error("No User Found")
      }

      const created_todo = await todo.create({ title, description,userId });
      return reply.code(201).send(created_todo);

    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  },

  async get_all_todos(req, reply) {
   
    const todos = await todo.findAll();
    
    if(!todos){
        throw new Error("No todo Available")
    }

    return reply.send(todos);
  },

  
  async get_todos_by_user(req, reply) {
    const { userId } = req.query;
  
    const found_user = await user.findOne({
      where: { id:userId },
      include: "Todos", 
    });
    const userData = found_user.toJSON()
   
      if (!found_user){
        throw new Error("No User Found")
      }

    return reply.send(userData.Todos);
  },


  async update_todo(req, reply) {
    try {
      
      const { title, description,is_completed,id} = req.body;
       const found_todo = await todo.findOne({
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
    
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  },

  async delete_todo(req, reply) {
    try {
      const { id } = req.query;
      console.log("ID",id)
      
      const found_todo = await todo.findOne({
        where: { id },
      });
     
      console.log("FOUND TODo",found_todo)
     
       if (!found_todo){
          throw new Error("Todo Not Found")
       }

      await found_todo.destroy();
      return reply.send({ message: 'Todo deleted successfully' });
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  },
 
};

module.exports = TodoController;
