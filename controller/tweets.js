// import 'express-async-errors';
import { getSocketIO } from '../connection/socket.js';
import * as tweetDB from '../data/tweets.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  // query가 존재한다면 전자, 존재하지 않는다면 후자
  const data = await (username //
    ? tweetDB.getAllByUsername(username)
    : tweetDB.getAll());
  // console.log(data);
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  // console.log(id);
  const find = await tweetDB.findById(id);
  if (find) res.status(200).json(find);
  else res.status(404).json({ message: `Tweet id(${id}) not found!` });
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetDB.create(text, req.userId); //userId는 미들웨어에서 req객체에 추가했음
  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetDB.findById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    //글을 쓴 사용자와 글을 수정하려는 사용자가 같은 사용자인지 체크
    return res.sendStatus(403);
  }

  const updated = await tweetDB.update(id, text);
  res.status(200).json(updated);
}

export async function removeTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetDB.findById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetDB.remove(id);
  res.sendStatus(204);
}
