const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Animais = sequelize.define('Animais', {
    especie: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: false,
    },
    habitate:{
        type: DataTypes.STRING,
        defaultValue:false,
    }
});
Animais.sync({ alter: true }) // Sincroniza a tabela no banco de dados 
    .then(() => console.log("Tabela Animais sincronizada!"))
    .catch((err) => console.error("Erro ao sincronizar tabela:", err));
module.exports = Animais; 
