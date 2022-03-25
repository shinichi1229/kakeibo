'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Shop = loader.database.define(
  'shops',
  {
    shopid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userid: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    shopname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Shop;