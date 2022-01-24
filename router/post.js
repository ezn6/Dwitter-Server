import express from 'express';
import 'express-async-errors';

const router = express.Router();

// DB없이 메모리로 서버 구성하는 version

const tweets = [
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

//트윗 작성
router.post('/', (req, res) => {
  // const tweet = {
  //   id: Date.now(),
  //   createdAt: new Date(),
  //   name: 'Ellie',
  //   username: 'ellie',
  //   text,
  // };
  tweets.push(req.body);
  res.status(201).json(tweets);
});

//트윗 수정
router.put('/:postId', (req, res) => {
  const postId = req.params.postId;
  //tweets에 해당 postId가 있다면 수정해야함
  const find = tweets.filter((t) => t.postId === postId);
  find[0].text = req.body.text;
  res.status(201).json(tweets);
});

//트윗 삭제
router.delete('/:postId', (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  const findArr = tweets.filter((t) => t.postId !== postId);
  res.status(201).json(findArr);
});

export default router;
