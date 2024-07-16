const express = require('express');
const path = require('path');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const client = new Client({
    user: 'postgres.etlunllealcmkzsdgkyq',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    database: 'postgres',
    password: '9EjGUdeP0n67K2Pb',
    port: 6543,
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

async function getEspacos() {
    try {
        const query = 'SELECT id, tipo_de_espaco, nome_do_espaco, descricao_do_espaco, ativo FROM espaco';
        const result = await client.query(query);
        return result.rows;
    } catch (err) {
        console.error('Erro ao executar consulta SQL:', err);
        throw err;
    }
}

async function updateEspaco(id, tipo, nome, descricao, ativo) {
    try {
        const query = 'UPDATE espaco SET tipo_de_espaco = $1, nome_do_espaco = $2, descricao_do_espaco = $3, ativo = $4 WHERE id = $5';
        await client.query(query, [tipo, nome, descricao, ativo, id]);
    } catch (err) {
        console.error('Erro ao atualizar dados no banco de dados:', err.message, err.stack);
        throw err;
    }
}

app.use(express.static(path.join(__dirname, 'public')));

// Serve gestao.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'gestao.html'));
});

app.get('/data', async (req, res) => {
    try {
        const espacos = await getEspacos();
        res.json(espacos);
    } catch (err) {
        res.status(500).send('Erro ao consultar dados.');
    }
});

app.post('/update', async (req, res) => {
    const { id, tipo_de_espaco, nome_do_espaco, descricao_do_espaco, ativo } = req.body;
    try {
        await updateEspaco(id, tipo_de_espaco, nome_do_espaco, descricao_do_espaco, ativo);
        res.status(200).send('Dados atualizados com sucesso.');
    } catch (err) {
        res.status(500).send(`Erro ao atualizar dados: ${err.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
