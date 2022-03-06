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
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export async function findById(id) {
  return tweets.find((t) => t.id === id);
}

export async function create(text, name, username, url) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
    url,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (text) tweet.text = text;
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}
