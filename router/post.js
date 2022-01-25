import express from 'express';
import 'express-async-errors';

const router = express.Router();

// DB없이 메모리로 서버 구성하는 version

let tweets = [
  {
    postId: '1',
    text: '화이팅!',
    createdAt: Date.now().toString(),
    nickName: 'Bob',
    id: 'bob', //tweet id
    url: 'https://cdn.pixabay.com/photo/2021/10/02/09/57/woman-6674780_1280.jpg',
  },
  {
    postId: '2',
    text: '커피 한잔 할래요~',
    createdAt: Date.now().toString(),
    nickName: 'Ellie',
    id: 'ellie', //tweet id
    url: 'https://media.istockphoto.com/photos/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-picture-id1318459282?s=612x612',
  },
  {
    postId: '3',
    text: '아이스 아메리카노 🥃',
    createdAt: Date.now().toString(),
    nickName: 'Ellie',
    id: 'ellie', //tweet id
    url: 'https://media.istockphoto.com/photos/portrait-smile-beautiful-business-asian-woman-in-pink-suit-working-in-picture-id1318459282?s=612x612',
  },
];

//전체 트윗 조회 api + 특정 유저 트윗 조회
router.get('/', (req, res) => {
  const id = req.query.id;
  // query가 존재한다면 전자, 존재하지 않는다면 후자
  const data = id ? tweets.filter((t) => t.id === id) : tweets;
  res.status(200).json(data);
  // res.status(200).send(data); 차이???
});

//특정 트윗 찾기
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  const find = tweets.find((t) => t === postId);
  if (find) res.status(200).json(find);
  else res.status(404).json({ message: `Tweet id(${postId}) not found!` });
});

//트윗 작성
router.post('/', (req, res) => {
  const { text, id, nickName, url } = req.body;
  const tweet = {
    postId: '4',
    text,
    createdAt: new Date(),
    nickName,
    id,
    url,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweets);
});

//트윗 수정
router.put('/:postId', (req, res) => {
  const postId = req.params.postId;
  //tweets에 해당 postId가 있다면 수정해야함
  const tweet = tweets.find((t) => t.postId === postId);
  console.log(tweet);
  if (tweet) {
    tweet.text = req.body.text;
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet id(${postId}) not found!` });
  }
});

//트윗 삭제
router.delete('/:postId', (req, res) => {
  const postId = req.params.postId;
  tweets = tweets.filter((t) => t.postId !== postId);
  res.sendStatus(204);
});

export default router;
