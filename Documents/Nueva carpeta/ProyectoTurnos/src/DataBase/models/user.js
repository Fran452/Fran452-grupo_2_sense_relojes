module.exports = (sequelize, dataTypes) => {
    const users = sequelize.define("users",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: dataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: dataTypes.STRING(25),
                allowNull: false
            },
            email: {
                type: dataTypes.TEXT(),
                allowNull: false,
                isEmail: true
            },
            password: {
                type: dataTypes.TEXT(),
                allowNull: false
            },
            created_at:{
                type: dataTypes.DATE
            },
            updated_at:{
                type: dataTypes.DATE
            }

        },
        {
            tableName : "users",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at", 
        }
    );
    return users;
}