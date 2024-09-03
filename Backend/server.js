const express = require('express');
const db = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const serverPort = 5000;

const allowedOrigin = ['http://localhost:5173', 'http://localhost:5000'];

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  // Izinkan pengiriman cookies
}));
app.use(cookieParser());
app.use(express.json());

app.listen(serverPort, () => {
    console.log(`Running on port ${serverPort}`);
});

db.connect((err) => { if (err) { console.log("[ DB MYSQL NOT CONNECT ❌ ]"); } else { console.log("[DB MYSQL CONNECTED ✔ ]"); }});

const siswaRoutes = require('./routes/siswa');
const loginRoutes = require('./routes/login');
const authRoutes = require('./middleware/authMiddleware');

app.use('/siswa', siswaRoutes);
app.use('/login', loginRoutes);
app.use('/verify', authRoutes);

app.get('/', (req, res) => {
    return res.status(403).json('it works');
});