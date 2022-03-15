let users = [
  {
    userId: '1',
    username: 'bob',
    password: '$2b$10$cn6xwcHQEmmk1Zx1ip7dG.tFtqx4bNtirZbVa9NckOywzkgYSDQNa', //test123
    name: 'Bob',
    email: 'bob@naver.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
  {
    userId: '2',
    username: 'ellie',
    password: '$2b$10$cn6xwcHQEmmk1Zx1ip7dG.tFtqx4bNtirZbVa9NckOywzkgYSDQNa', //test123
    name: 'Ellie',
    email: 'ellie@naver.com',
    url: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664__340.jpg',
  },
];

export async function findUser(username) {
  return users.find((u) => u.username === username);
}

export async function findById(userId) {
  return users.find((u) => u.userId === userId);
}

export async function createUser(username, hashedPassword, name, url, email) {
  const user = {
    userId: Date.now().toString(),
    username,
    password: hashedPassword,
    name,
    url,
    email,
  };
  users = [...users, user];
  return user.userId;
}
