// message.js

const { DataTypes } = require("sequelize");

module.exports = messageModel;

function messageModel(sequelize) {
    const attributes = {
        text: { type: DataTypes.TEXT, allowNull: false },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        receiverId: { type: DataTypes.INTEGER, allowNull: false }
    };
    return sequelize.define("Message", attributes, { timestamps: true });
}
