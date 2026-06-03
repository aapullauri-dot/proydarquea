require('dotenv').config();
const jwt = require('jsonwebtoken');

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const token = jwt.sign(
  { id: 45, email: 'juan@email.com' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

console.log('Token generado:', token);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Token verificado OK:', decoded);
} catch (err) {
  console.log('❌ Error:', err.message);
}
