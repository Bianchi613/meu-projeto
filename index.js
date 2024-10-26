const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  // Para permitir envio de JSON no body das requisições

// Simulando um "banco de dados" com um array
let alunos = [
    { id: 1, nome: 'João', idade: 18 },
    { id: 2, nome: 'Maria', idade: 20 },
    { id: 3, nome: 'Pedro', idade: 19 }
];

// GET - Listar todos os alunos
app.get('/alunos', (req, res) => {
    res.json(alunos);
});

// GET - Visualizar um aluno específico por ID
app.get('/alunos/:id', (req, res) => {
    const alunoId = parseInt(req.params.id);
    const aluno = alunos.find(a => a.id === alunoId);
    
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// POST - Adicionar um novo aluno
app.post('/alunos', (req, res) => {
    const novoAluno = {
        id: alunos.length + 1,
        nome: req.body.nome,
        idade: req.body.idade
    };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

// PUT - Atualizar um aluno existente (substitui o aluno por completo)
app.put('/alunos/:id', (req, res) => {
    const alunoId = parseInt(req.params.id);
    const alunoIndex = alunos.findIndex(a => a.id === alunoId);
    
    if (alunoIndex !== -1) {
        alunos[alunoIndex] = {
            id: alunoId,
            nome: req.body.nome,
            idade: req.body.idade
        };
        res.json(alunos[alunoIndex]);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// PATCH - Atualizar parcialmente um aluno
app.patch('/alunos/:id', (req, res) => {
    const alunoId = parseInt(req.params.id);
    const aluno = alunos.find(a => a.id === alunoId);
    
    if (aluno) {
        if (req.body.nome) aluno.nome = req.body.nome;
        if (req.body.idade) aluno.idade = req.body.idade;
        res.json(aluno);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// DELETE - Remover um aluno por ID
app.delete('/alunos/:id', (req, res) => {
    const alunoId = parseInt(req.params.id);
    const alunoIndex = alunos.findIndex(a => a.id === alunoId);
    
    if (alunoIndex !== -1) {
        alunos.splice(alunoIndex, 1);
        res.status(204).send();  // Sucesso, mas sem conteúdo
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



app.use(express.static('public'));






//const express = require('express');
//const app = express();

//app.get('/', (req, res) => {
  //res.send('Olá, mundo!');
//});

//app.listen(3000, () => {
 // console.log('Servidor rodando na porta 3000');
//});
