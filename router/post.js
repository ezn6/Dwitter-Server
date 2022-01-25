import express from 'express';
import 'express-async-errors';

const router = express.Router();

// DB없이 메모리로 서버 구성하는 version

let tweets = [
  {
    id: '1', //postId
    text: '드림코더분들 화이팅!',
    createdAt: Date.now().toString(),
    name: 'Bob', //nickname
    username: 'bob', //tweet id
    url: 'https://cdn.pixabay.com/photo/2021/10/09/05/33/cosmos-6693008__480.jpg',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
  {
    id: '3',
    text: '아이스 아메리카노 🥃',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
  // {
  //   postId: '3',
  //   text: '아이스 아메리카노 🥃',
  //   createdAt: Date.now().toString(),
  //   nickName: 'Ellie',
  //   id: 'ellie', //tweet id
  //   url: 'https://media.istockphoto.com/photos/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-picture-id1318459282?s=612x612',
  // },
];

//전체 트윗 조회 api + 특정 유저 트윗 조회
router.get('/', (req, res) => {
  const username = req.query.username;
  // query가 존재한다면 전자, 존재하지 않는다면 후자
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  res.status(200).json(data);
});

//특정 트윗 찾기
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const find = tweets.find((t) => t.id === id);
  if (find) res.status(200).json(find);
  else res.status(404).json({ message: `Tweet id(${id}) not found!` });
});

//트윗 작성
router.post('/', (req, res) => {
  const { text, name, username, url } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
    url,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

//트윗 수정
router.put('/:id', (req, res) => {
  const id = req.params.id;
  //tweets에 해당 id가 있다면 수정해야함
  const tweet = tweets.find((t) => t.id === id);
  console.log(tweet);
  if (tweet) {
    tweet.text = req.body.text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found!` });
  }
});

//트윗 삭제
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
});

export default router;
