import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import * as userDB from '../data/auth.js';
import { config } from '../config.js';

function CreatJwtToken(userId) {
  return jwt.sign(
    {
      userId: userId,
    },
    config.jwt.secretKey,
    { expiresIn: config.jwt.expiresInSec }
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
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

  //db에 모든 body값들 저장하는 로직=> 고유한 userId로 받음
  const userId = await userDB.createUser(
    //createUser함수는 return user.userId
    username,
    hashedPassword,
    name,
    url,
    email
  );
  // console.log('@@@', userId);
  const token = CreatJwtToken(userId);

  res.status(201).json({ username: username, token: token });
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

  //서버에 등록된 유효한 사용자라면 jwt 제공
  // console.log(findUser.id);
  const token = CreatJwtToken(findUser.id);
  // res.status(200).json({ username: `${username}`, jwt: `${token}` });
  res.status(200).json({ username: username, token: token });
}

//Me
export async function me(req, res) {
  const user = await userDB.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json({ username: user.username, token: req.token });
}
