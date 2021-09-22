const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db')

class User extends Model {}

User.init({
  // 在这里定义模型属性
  nickname: {
    type: DataTypes.STRING,
  },
  openid: {
    type: DataTypes.STRING,
    unique: true
  },

}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
});

module.exports = User