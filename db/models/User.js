const { Model, DataTypes } = require("sequelize");

module.exports = function(connection) {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING(255),
        }
    }, {
        sequelize: connection,
        tableName: 'users',
        timestamps: false,
    });

    return User;
}