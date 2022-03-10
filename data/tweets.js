import * as userDB from '../data/auth.js';

let tweets = [
  {
    id: '1', //postId
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '3',
    text: '아이스 아메리카노 🥃',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAll() {
  return Promise.all(
    //Promise : Promise is a JavaScript object for asynchronous operation
    //all : An array of Promises.
    tweets.map(async (tweet) => {
      const { username, name, url } = await userDB.findById(tweet.userId);
      return { ...tweet, username, name, url }; //tweets에 username, name, url정보가 포함된
    })
  );
}

export async function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export async function findById(id) {
  return tweets.find((t) => t.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) tweet.text = text;
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}
