import express from 'express';
import 'express-async-errors';
import * as tweetDB from '../data/tweets.js';

const router = express.Router();

// DB없이 메모리로 서버 구성하는 version

//전체 트윗 조회 api + 특정 유저 트윗 조회
router.get('/', (req, res) => {
  const username = req.query.username;
  // query가 존재한다면 전자, 존재하지 않는다면 후자
  const data = username //
    ? tweetDB.getAllByUsername(username)
    : tweetDB.getAll();
  res.status(200).json(data);
});

//특정 트윗 찾기
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const find = tweetDB.findById(id);
  if (find) res.status(200).json(find);
  else res.status(404).json({ message: `Tweet id(${id}) not found!` });
});

//트윗 작성
router.post('/', (req, res) => {
  const { text, name, username, url } = req.body;
  const tweet = tweetDB.create(text, name, username, url);
  res.status(201).json(tweet);
});

//트윗 수정
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  //tweets에 해당 id가 있다면 수정해야함
  const tweet = tweetDB.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found!` });
  }
});

//트윗 삭제
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  tweetDB.remove(id);
  res.sendStatus(204);
});

export default router;
