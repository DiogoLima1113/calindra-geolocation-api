import app from './src/config/server';
const porta = process.env.PORTA;

app.listen(porta, () => console.log(`Api rodando com sucesso na porta ${porta}`));