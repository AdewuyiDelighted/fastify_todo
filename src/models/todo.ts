import { Model } from "sequelize";

import { DataTypes } from 'sequelize';
import {sequelize} from "../connectDB";
import { User } from './user';


export class Todo extends Model {
  public id!: string;
  public title!: string;
  public is_completed!: boolean;
  description!:string;
  public userId!: string;
}

Todo.init( {
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
},
  {
    sequelize,
    tableName: "Todos",
  }
);

User.hasMany(Todo, { foreignKey: 'userId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId' });
export default Todo;




