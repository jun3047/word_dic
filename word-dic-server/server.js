require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const client_url = process.env.CLIENT_URL || 'http://localhost:3000';
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: client_url }));

const JSON_FILE_PATH = './db/license_key.json'

async function run() {
  const uri = process.env.MONGODB_KEY;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getLicKeyList() {

  const data = await fs.readFile(JSON_FILE_PATH, 'utf-8');
  const parsedData = JSON.parse(data);

  return parsedData
}

const dbClientPromise = run();

app.post('/register', async (req, res) => {
  const dbClient = await dbClientPromise;

  try {
    const { email, password, licKey } = req.body;

    // licKey 검사
    const licKeyList = await getLicKeyList()
    const userLicense = licKeyList.find(item => item.value === licKey);
    console.log("userLicense:", userLicense)

    if(!userLicense){
      return res.status(200).json({ message: 'licKey wrong.', type: '틀림' });
    }
    
    if(userLicense.used){
      return res.status(200).json({ message: 'licKey already used.', type: '중복' });
    }

    const filterLicKeyList = licKeyList.filter(item => item.value !== licKey);

    // 사용으로 표시
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify([
      ...filterLicKeyList, {...userLicense, used: true},
    ], null, 2));
    
    // 가입
    const db = dbClient.db('perfect-word-dic');
    const users = db.collection('user');
    const counts = db.collection('count');
    
    const { userCnt } = await counts.findOneAndUpdate(
      { _id: "1" }, // 쿼리 조건
      { $inc: { userCnt: 1 } }, // 업데이트할 필드와 값
      { returnDocument: "after" } // 업데이트 후의 문서 반환 설정
    );
    
    await users.insertOne({
      license: licKey,
      id: userCnt,
      email,
      password,
    })

    await counts.findOne({_id: "1"}).userCnt + 1

    console.log(userCnt)

    res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
});

// 사용자 로그인 라우트
app.post('/login', async (req, res) => {
  const dbClient = await dbClientPromise;

  try {

    const { email, password } = req.body;
    const db = dbClient.db('perfect-word-dic');
    const users = db.collection('user');
    const user = await users.findOne({email: email});

    if (!user) {
      return res.status(200).json({ message: 'User not found.', type: '없음' });
    }

    if (user.password !== password) {
      return res.status(200).json({ message: 'Wrong password.', type: '비번오류' });
    }

    res.status(201).json({ message: 'Login successful.', license: user.license});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 서버 시작
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});