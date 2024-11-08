const express = require('express');
const app = express();
app.use(express.json());

app.post('/calcular-imc', (req, res) => {
    const { nome, peso, altura, idade } = req.body;

    // Validação dos dados de entrada
    if (!peso || !altura || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || altura >= 3 || peso >= 300) {
        return res.send('Peso e altura são obrigatórios e devem ser válidos.');
    }

    // Definindo a classe Pessoa
    class Pessoa {
        constructor(nome, altura, peso) {
            this.nome = nome;
            this.altura = altura;
            this.peso = peso;
        }

        // Método para calcular IMC
        calcularIMC() {
            const imc = this.peso / (this.altura * this.altura);
            return imc;
        }

        // Método para classificar o IMC
        classificarIMC(imc) {
            let classificacao;
            if (imc < 18.5) {
                classificacao = 'Abaixo do peso';
            } else if (imc < 24.9) {
                classificacao = 'Peso normal';
            } else if (imc < 29.9) {
                classificacao = 'Sobrepeso';
            } else if (imc < 34.9) {
                classificacao = 'Obesidade grau 1';
            } else if (imc < 39.9) {
                classificacao = 'Obesidade grau 2';
            } else {
                classificacao = 'Obesidade grau 3';
            }
            return classificacao;
        }
    }

    // Criando a instância da pessoa
    const pessoa = new Pessoa(nome, altura, peso);

    // Calculando o IMC
    const imc = pessoa.calcularIMC();
    const classificacaoIMC = pessoa.classificarIMC(imc);

    // Retornando a resposta em formato JSON com as classificações
    res.json({
        nome: pessoa.nome,
        peso: pessoa.peso,
        altura: pessoa.altura,
        imc: imc.toFixed(2),
        classificacaoIMC,
    });
});

app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081");
});
