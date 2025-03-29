const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const animaisController = require('./controllers/animaisController');
const trabalhadores = require("./controllers/trabalhadoresController");
const trabalhadoresController = require('./controllers/trabalhadoresController');
const app = express();
// Configuração do Handlebars 
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'layout',
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: path.join(__dirname, 'views/partials')
    })
);
app.set('view engine', 'handlebars');
// Middlewares 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Rotas 
app.get('/', animaisController.exibirLista);
app.get('/animais/adicionar', animaisController.exibirAdicionarAnimais);
app.post('/animais', animaisController.adicionarAnimal);
app.get('/animais/:id/edita', animaisController.exibirEdicao);
app.post('/animais/:id/edita', animaisController.editarAnimal);
app.get('/animais/:id/excluir', animaisController.excluirAnimal);

app.get('/trabalhadores/lista', trabalhadoresController.exibirLista)
app.get('/trabalhadores/adicionar', trabalhadoresController.exibirAdicionarTrabalhadores);
app.post('/trabalhadores', trabalhadoresController.adicionarTrabalhador);
app.get('/trabalhadores/:id/editar', trabalhadoresController.exibirEdicao);
app.post('/trabalhadores/:id/editar', trabalhadoresController.editarTrabalhador);
app.get('/trabalhadores/:id/excluir', trabalhadoresController.excluirTrabalhador);
// Servidor 
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});