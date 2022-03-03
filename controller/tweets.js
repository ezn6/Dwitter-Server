import * as tweetDB from '../data/tweets.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  // query가 존재한다면 전자, 존재하지 않는다면 후자
  const data = await (username //
    ? tweetDB.getAllByUsername(username)
    : tweetDB.getAll());
  console.log(data);
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
  const { text, name, username, url } = req.body;
  const tweet = await tweetDB.create(text, name, username, url);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  //tweets에 해당 id가 있다면 수정해야함
  const tweet = await tweetDB.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found!` });
  }
}

export async function removeTweet(req, res) {
  const id = req.params.id;
  // console.log(id);
  await tweetDB.remove(id);
  res.sendStatus(204);
}
