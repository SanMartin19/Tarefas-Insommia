const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const filePath = './tarefas.json';

// Para carregar e salvar as tarefas
const carregarTarefas = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const dados = fs.readFileSync(filePath);
  return JSON.parse(dados);
};

const salvarTarefas = (tarefas) => {
  fs.writeFileSync(filePath, JSON.stringify(tarefas, null, 2));
};

// GET: listar tarefas
app.get('/api/v1/tarefas', (req, res) => {
  const tarefas = carregarTarefas();
  res.json(tarefas);
});

// POST: criar nova tarefa
app.post('/api/v1/tarefas', (req, res) => {
  const { descricao } = req.body;

  if (!descricao) {
    return res.send('A descrição da tarefa é obrigatória.');
  }

  const tarefas = carregarTarefas();
  const novaTarefa = { id: Date.now(), descricao, concluida: false };
  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);

  res.json(novaTarefa);
});

// PUT: atualizar tarefa
app.put('/api/v1/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { descricao, concluida } = req.body;

  const tarefas = carregarTarefas();
  const tarefa = tarefas.find((t) => t.id == id);

  if (!tarefa) {
    return res.send('Tarefa não encontrada.');
  }

  if (descricao) tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;

  salvarTarefas(tarefas);
  res.json(tarefa);
});

// DELETE: deletar tarefa
app.delete('/api/v1/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const tarefas = carregarTarefas();
  const index = tarefas.findIndex((t) => t.id == id);

  if (index === -1) {
    return res.send('Tarefa não encontrada.');
  }

  const tarefaRemovida = tarefas.splice(index, 1)[0];
  salvarTarefas(tarefas);
  res.json(tarefaRemovida);
});


app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081");
});