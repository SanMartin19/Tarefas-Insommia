const express = require('express');
const app = express();
app.use(express.json());

app.post('/calcular-imposto', (req, res) => {
    const { nome, preco, tipo } = req.body;
  
  
  
    let imposto;
    switch (tipo.toLowerCase()) {
      case 'eletronico':
        imposto = preco * 0.2;
        break;
      case 'alimenticio':
        imposto = preco * 0.05;
        break;
      case 'vestuario':
        imposto = preco * 0.1;
        break;
      default:
        return res.send('Tipo de produto inválido.');
    }
  
    const precoFinal = preco + imposto;
  
    res.json({
      nome,
      precoOriginal: preco,
      impostoAplicado: imposto,
      precoFinal
    });
  });

  app.listen(8081, () => {
    console.log("Servidor iniciado na porta 8081");
});