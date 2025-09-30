require('dotenv').config();
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
    // CORREÇÃO: O modelo é 'usuario', não 'user'.
    // CORREÇÃO: O campo no banco é 'senha', não 'password'.
    const novoUsuario = await prisma.usuario.create({
      data: { 
        nome, 
        email, 
        senha: hash // O campo no seu banco de dados se chama 'senha'
      }
    });
    // AJUSTE: Retornando a variável correta ('novoUsuario') que foi criada.
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: novoUsuario });
  } catch (error) {
    // AJUSTE: Melhor tratamento de erro para email duplicado.
    if (error.code === 'P2002') { // Código de erro do Prisma para violação de constraint única
      return res.status(409).json({ error: 'Este email já está em uso.' });
    }
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});

// Login de usuário
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }
  try {
    // CORREÇÃO: O modelo é 'usuario', não 'user'.
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado.' });
    
    // CORREÇÃO: O campo no banco é 'senha', não 'password'.
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta.' });
    
    res.json({ message: 'Login realizado com sucesso!', user: usuario });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao fazer login.' });
  }
});


// Endpoint para buscar dados do usuário autenticado
app.post('/api/usuario', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email é obrigatório.' });
  try {
    // CORREÇÃO: O modelo é 'usuario', não 'user'.
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: { id: true, nome: true, email: true }
    });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar o usuário.' });
  }
});

// Endpoint para buscar resultados dos questionários do usuário
app.post('/api/usuario/resultados', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email é obrigatório.' });
  try {
    // CORREÇÃO: O modelo é 'usuario', não 'user'.
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    
    // CORREÇÃO: O modelo é 'questionario', não 'resultado'.
    // CORREÇÃO: A chave estrangeira é 'usuario_id', não 'userId'.
    const resultados = await prisma.questionario.findMany({
      where: { usuario_id: usuario.id },
      select: { id: true, resultado: true, data_resposta: true } 
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os resultados.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});