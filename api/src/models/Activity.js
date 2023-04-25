const { DataTypes } = require(Sequelize)

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrementer: true,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificultad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duracion:{
            type: Datatypes.DATE,
            allowNull: FALSE,
        },
        temporada:{
            type: DataTypes.ENUM(Verano, Otoño, Invierno, Primavera)
        },
    })
} 