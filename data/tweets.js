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
  return getAll().then((tweets) =>
    tweets.filter((t) => t.username === username)
  );
}

export async function findById(id) {
  //해당 postId에 따른 트윗 글 한개만 보여짐

  const found = tweets.find((t) => t.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userDB.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return findById(tweet.id); //만들고 나서 사용자에게는 url, name과같은 정보를 보여줘야하니까 findById함수로 리턴
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) tweet.text = text;
  return findById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}
