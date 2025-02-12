import { Model } from "sequelize";

import { DataTypes } from 'sequelize';
import {sequelize} from "../connectDB";

export class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
}

User.init( {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},

{
  sequelize,
  tableName: "Users",
}
);

export default User;
