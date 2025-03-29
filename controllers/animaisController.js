const Animais = require('../models/Animais');

module.exports = {
    async exibirLista(req, res) {
        try {
            // Busca todas as animais no banco 
            const animais = await Animais.findAll();
            // Converte as instâncias do Sequelize em objetos puros 
            const animaisJSON = animais.map((animal) => animal.toJSON());
            // Renderiza a lista de tarefas 
            res.render('listaAnimais', { animais: animaisJSON });
        } catch (error) {
            console.error("Erro ao listar animais:", error);
            res.status(500).send("Erro ao carregar os animais.");
        }
    },
    exibirAdicionarAnimais(req, res) {
        res.render('adicionarAnimal');
    },

    async adicionarAnimal(req, res) {
        try {
            // Cria uma nova tarefa no banco 
            await Animais.create({especie: req.body.especie,quantidade: req.body.quantidade,habitate: req.body.habitate });
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao adicionar Animal:", error);
            res.status(500).send("Erro ao adicionar a animal.");
        }
    },

    async exibirEdicao(req, res) {
        try {
            // Busca a tarefa pelo ID 
            const animais = await Animais.findByPk(req.params.id);

            // Verifica se a tarefa existe 
            if (!animais) {
                return res.status(404).send("Animal não encontrada.");
            }

            // Converte para JSON e envia para a view 
            const animaisJSON = animais.toJSON();
            res.render('editaAnimal', { animais: animaisJSON });
        } catch (error) {
            console.error("Erro ao carregar animal para edição:", error);
            res.status(500).send("Erro ao carregar animal para edição.");
        }
    },

    async editarAnimal(req, res) {
        try {
            const { id } = req.params;
            // Atualiza a tarefa no banco de dados 
            const [updatedRows] = await Animais.update(
                {
                    especie: req.body.especie,
                    quantidade: req.body.quantidade,
                    habitate: req.body.habitate
                },
                { where: { id } }
            );
            // Verifica se alguma linha foi atualizada 
            if (updatedRows === 0) {
                return res.status(404).send("Animal não encontrada para edição."); 
            }
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao editar animal:", error);
            res.status(500).send("Erro ao editar a animal.");
        }
    },

    async excluirAnimal(req, res) {
        try {
            const { id } = req.params;
            // Remove a tarefa do banco de dados 
            const deletedRows = await Animais.destroy({ where: { id } });
            if (deletedRows === 0) {
                return res.status(404).send("Animal não encontrada para exclusão."); 
            }
            res.redirect('/');
        } catch (error) {
            console.error("Erro ao excluir animal:", error);
            res.status(500).send("Erro ao excluir a animal.");
        }
    }
}; 