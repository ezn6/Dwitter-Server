import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import * as userDB from '../data/auth.js';

//TODO: Make it secure
const jwtSecretKey = 'ppMWFaXXaf9djP2Z*euoL9JBl^nLedBI';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 10;
function CreatJwtToken(userId) {
  return jwt.sign(
    {
      userId: userId,
    },
    jwtSecretKey,
    { expiresIn: jwtExpiresInDays }
  );
}

//회원가입
export async function signUp(req, res) {
  const { username, password, name, url, email } = req.body;
  const findUser = await userDB.findUser(username);
  if (findUser) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  // pw를 bcrypt -> jwt token생성
  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);

  //db에 모든 body값들 저장하는 로직=> 고유한 userId로 받음
  const userId = await userDB.createUser(
    username,
    hashedPassword,
    name,
    url,
    email
  );

  const token = CreatJwtToken(userId);

  res.status(201).json({ username: username, jwt: token });
}

//로그인
export async function login(req, res) {
  const { username, password } = req.body;
  const findUser = await userDB.findUser(username);
  if (!findUser) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  //findUser 있으면 그 유저의 비번이랑 bcrypt된 비번이랑 비교해야함
  const isValidPassword = await bcrypt.compare(password, findUser.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  // console.log(`here : ${findUser.userId}`);
  //서버에 등록된 유효한 사용자라면 jwt 제공
  const token = CreatJwtToken(findUser.userId);
  // res.status(200).json({ username: `${username}`, jwt: `${token}` });
  res.status(200).json({ username: username, jwt: token });
}

//Me
export async function me(req, res) {
  const user = await userDB.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json({ jwt: req.token, username: user.username });
}