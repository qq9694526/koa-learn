const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./db");
const bcrypt = require("bcryptjs"); // 密码加解密

class Admin extends Model {}

// 用户
Admin.init(
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      },
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: "Admin", // 我们需要选择模型名称
  }
);

module.exports = Admin;
