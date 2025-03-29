const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Trabalhadores = sequelize.define('Trabalhadores', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    funcao:{
        type: DataTypes.STRING,
        defaultValue:false,
    }
});
Trabalhadores.sync({ alter: true }) // Sincroniza a tabela no banco de dados 
    .then(() => console.log("Tabela Trabalhadores sincronizada!"))
    .catch((err) => console.error("Erro ao sincronizar tabela:", err));
module.exports = Trabalhadores; 
