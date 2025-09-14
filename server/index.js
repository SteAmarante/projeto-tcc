const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Cadastro de usuário
app.post('/api/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }
  try {
    const hash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { nome, email, password: hash }
    });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login de usuário
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(senha, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta.' });
    res.json({ message: 'Login realizado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
