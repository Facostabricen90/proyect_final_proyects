import { Sequelize } from "sequelize";      

export const sequelize = new Sequelize('projectdb', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});