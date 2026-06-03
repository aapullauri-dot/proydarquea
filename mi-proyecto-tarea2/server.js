const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente' });
});

app.use('/auth', require('./routes/auth'));
app.use('/transferencias', require('./routes/transferencias'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});
