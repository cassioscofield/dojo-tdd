const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send({mensagem: 'API está no ar'});
});

app.get('/campanha/:idCampanha', (req, res) => {
    const campanhaController = require('./controller');
    campanhaController()(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});