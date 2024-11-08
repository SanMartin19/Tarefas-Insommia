const express = require('express');
const app = express();
app.use(express.json());

app.get("/verificarIdade", (req, res) => {
    res.send(`
        <form action="/querys" method="GET">
            <input type="text" name="nome" placeholder="Nome">
            <br><br>
            <input type="number" name="idade" placeholder="Idade">
            <br><br>
           
        </form>
    `);
});

app.get("/querys", (req, res) => {
    const { nome, idade } = req.query;
    if (!nome || !idade) {
        return res.send("Erro: Parâmetros 'nome' e 'idade' são obrigatórios.");
    }
    
    // Verifica se a idade é maior ou menor de 18 anos
    if (idade >= 18) {
        res.send(`Olá ${nome}, você tem ${idade} anos e é maior de idade.`);
    } else {
        res.send(`Olá ${nome}, você tem ${idade} anos e é menor de idade.`);
    }
});
        


app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081");
});
