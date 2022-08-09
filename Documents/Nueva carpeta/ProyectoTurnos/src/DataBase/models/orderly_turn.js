module.exports = (sequelize, dataTypes) => {
    const orderly_turn = sequelize.define("orderly_turn",
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: dataTypes.INTEGER,
                allowNull: false
            },
            code: {
                type: dataTypes.STRING(4),
                allowNull: false
            },
            box: {
                type: dataTypes.TEXT(),
                allowNull: false,
                isEmail: true
            },
            created_at:{
                type: dataTypes.DATE
            },
            updated_at:{
                type: dataTypes.DATE
            },
            deleted_at:{
                type: dataTypes.DATE
            },

        },
        {
            tableName : "orderly_turn",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at", 
        }
    );
    return orderly_turn;
}