const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db')

class Consultant extends Model {}

// 销售顾问
Consultant.init({
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING(40),
  },
  avatar: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  tag:{
    type: DataTypes.STRING(80),
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Consultant' // 我们需要选择模型名称
});

module.exports = Consultant