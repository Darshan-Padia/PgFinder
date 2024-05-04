const { MYSQL_DB_CONFIG } = require("../config/db.config");
const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
    const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

    const connection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);

    const sequelize = new Sequelize(DB, USER, PASSWORD, {
        dialect: "mysql",
        host: HOST,
    });

    // Define models
    db.Role = require("../Role/role.model")(sequelize, DataTypes);
    db.User = require("../User/user.model")(sequelize, DataTypes);
    db.Message = require("../Message/message.model")(sequelize, DataTypes);

    // Define associations
    // roles have many users , users table will have a column named role_id
    db.Role.hasMany(db.User, { foreignKey: "role_id" });
    // users belong to a single role
    db.User.belongsTo(db.Role, { foreignKey: "role_id" });

    // Sync models with database
    await sequelize.sync({ alter: false });
}
