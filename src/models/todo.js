const { DataTypes } = require('sequelize');
const sequelize = require('../../connectDB');
const User = require('./user');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Todo, { foreignKey: 'userId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId' });

module.exports = Todo;
