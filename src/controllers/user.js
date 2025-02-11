const user = require("../models/user")
const UserController = {
 
    async  create_user (req,reply) {
    try {
        const { name, email } = req.body;
        const found_user = await user.findOne({ where: { email } });        
        
        if(found_user){
            throw new Error("User Exist")
        }
        const created_user = await user.create({ name, email });
        return reply.code(201).send(created_user);
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }

},

async get_all_users(req, reply) {
    const users = await user.findAll();
    if(!user){
        throw new Error("No User Available")
    }
    return reply.send(users);
},

async get_user_by_id(req, reply) {
    try {
      const { id } =  req.query;      
      const found_user = await user.findOne({ where: { id:id } });        

      if (!found_user){
        throw new Error("No User Found")
      }
      return reply.send(found_user);
    
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
},


async delete_user(req, reply) {
    try {
      const { id } = req.query;
      const found_user = await user.findOne({ where: { id:id } });        

      if (!found_user){
        throw new Error("No User Found")
      }

      await found_user.destroy();
      return reply.send({ message: "User deleted successfully" });
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  }

}
module.exports = UserController;
