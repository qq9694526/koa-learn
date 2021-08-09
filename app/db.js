const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('7yue', 'root', 'qwer1234', {
  host: 'localhost',
  dialect: 'mysql',
  timezone:'+8:00'
});

async function start(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// start()
sequelize.sync({
  // force:true,
  // tableName:'user'
})

module.exports = sequelize
