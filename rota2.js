const express = require('express');
const app = express();
app.use(express.json());

app.get('/calcular-salario', (req, res) => {
    const salarioBruto = parseFloat(req.query.salario);
  
   

    // Função para calcular o INSS
    function calcularINSS(salarioBruto) {
        let inss;
        if (salarioBruto <= 1212.00) {
            inss = salarioBruto * 0.075;
        } else if (salarioBruto <= 2427.35) {
            inss = salarioBruto * 0.09;
        } else if (salarioBruto <= 3641.03) {
            inss = salarioBruto * 0.12;
        } else if (salarioBruto <= 7087.22) {
            inss = salarioBruto * 0.14;
        } else {
            inss = 7087.22 * 0.14; // Valor máximo do INSS
        }
        return inss;
    }
    
    // Função para calcular o IRPF
    function calcularIRPF(salarioBruto, inss) {
        const salarioBase = salarioBruto - inss;
        let irpf;
        if (salarioBase <= 1903.98) {
            irpf = 0;
        } else if (salarioBase <= 2826.65) {
            irpf = salarioBase * 0.075 - 142.80;
        } else if (salarioBase <= 3751.05) {
            irpf = salarioBase * 0.15 - 354.80;
        } else if (salarioBase <= 4664.68) {
            irpf = salarioBase * 0.225 - 636.13;
        } else {
            irpf = salarioBase * 0.275 - 869.36;
        }
        return irpf;
    }
    
    // Função principal para calcular o salário líquido
    function calcularSalarioLiquido(salarioBruto) {
        const inss = calcularINSS(salarioBruto);
        const irpf = calcularIRPF(salarioBruto, inss);
        const salarioLiquido = salarioBruto - inss - irpf;
        return { salarioLiquido, inss, irpf };
    }
    
    // Calcular os valores usando as funções definidas
    const { salarioLiquido, inss, irpf } = calcularSalarioLiquido(salarioBruto);
    
    res.json({
        salarioBruto,
        descontos: {
            inss,
            impostoRenda: irpf
        },
        salarioLiquido
    });
});

app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081");
});
