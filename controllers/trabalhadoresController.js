const Trabalhadores = require('../models/Trabalhadores');

module.exports = {
    async exibirLista(req, res) {
        try {
            // Busca todas as animais no banco 
            const trabalhadores = await Trabalhadores.findAll();
            // Converte as instâncias do Sequelize em objetos puros 
            const trabalhadoresJSON = trabalhadores.map((trabalhador) => trabalhador.toJSON());
            // Renderiza a lista de tarefas 
            res.render('listaTrabalhadores', { trabalhadores: trabalhadoresJSON });
        } catch (error) {
            console.error("Erro ao listar trabalhadores:", error);
            res.status(500).send("Erro ao carregar os trabalhadores.");
        }
    },
    exibirAdicionarTrabalhadores(req, res) {
        res.render('adicionarTrabalhador');
    },

    async adicionarTrabalhador(req, res) {
        try {
            // Cria uma nova tarefa no banco 
            await Trabalhadores.create({nome: req.body.nome,funcao: req.body.funcao});
            res.redirect('/trabalhadores/lista');
        } catch (error) {
            console.error("Erro ao adicionar Trabalhador:", error);
            res.status(500).send("Erro ao adicionar a Trabalhador.");
        }
    },

    async exibirEdicao(req, res) {
        try {
            // Busca a tarefa pelo ID 
            const trabalhadores = await Trabalhadores.findByPk(req.params.id);

            // Verifica se a tarefa existe 
            if (!trabalhadores) {
                return res.status(404).send("Trabalhador não encontrada.");
            }

            // Converte para JSON e envia para a view 
            const trabalhadoresJSON = trabalhadores.toJSON();
            res.render('editaTrabalhador', { trabalhadores: trabalhadoresJSON });
        } catch (error) {
            console.error("Erro ao carregar trabalhador para edição:", error);
            res.status(500).send("Erro ao carregar trabalhador para edição.");
        }
    },

    async editarTrabalhador(req, res) {
        try {
            const { id } = req.params;
            // Atualiza a tarefa no banco de dados 
            const [updatedRows] = await Trabalhadores.update(
                {
                    nome: req.body.nome,
                    funcao: req.body.funcao
                },
                { where: { id } }
            );
            // Verifica se alguma linha foi atualizada 
            if (updatedRows === 0) {
                return res.status(404).send("Trabalhador não encontrada para edição."); 
            }
            res.redirect('/trabalhadores/lista');
        } catch (error) {
            console.error("Erro ao editar Trabalhador:", error);
            res.status(500).send("Erro ao editar a Trabalhador.");
        }
    },

    async excluirTrabalhador(req, res) {
        try {
            const { id } = req.params;
            // Remove a tarefa do banco de dados 
            const deletedRows = await Trabalhadores.destroy({ where: { id } });
            if (deletedRows === 0) {
                return res.status(404).send("Trabalhador não encontrada para exclusão."); 
            }
            res.redirect('/trabalhadores/lista');
        } catch (error) {
            console.error("Erro ao excluir trabalhador:", error);
            res.status(500).send("Erro ao excluir trabalhador.");
        }
    }
}; 