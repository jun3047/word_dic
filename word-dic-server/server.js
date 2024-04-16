const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
app.use(bodyParser.json());


async function run() {

  const uri = process.env.MONGODB_KEY;
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);

const User = mongoose.model('user', {
    _id: String,
    email: String,
    password: String,
    licKey: String
});

// 사용자 등록 라우트
app.post('/register', async (req, res) => {
    try {
        const { email, password, licKey } = req.body;
        const user = new User({ email, password, licKey });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 사용자 로그인 라우트
app.post('/login', async (req, res) => {
    try {
        const { email, password, licKey } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.licKey !== licKey) {
            return res.status(403).json({ message: 'Invalid license key.' });
        }
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 서버 시작
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});