'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Receipt = loader.database.define(
  'receipts',
  {
    receiptid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    imgfilepath: {
      type: Sequelize.TEXT,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    shopid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdby: {
      type: Sequelize.UUID,
      allowNull: false
    },
    memo: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    postingdate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Receipt;