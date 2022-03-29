// let users = [
//   {
//     userId: '1',
//     username: 'bob',
//     password: '$2b$10$cn6xwcHQEmmk1Zx1ip7dG.tFtqx4bNtirZbVa9NckOywzkgYSDQNa', //test123
//     name: 'Bob',
//     email: 'bob@naver.com',
//     url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
//   },
//   {
//     userId: '2',
//     username: 'ellie',
//     password: '$2b$10$cn6xwcHQEmmk1Zx1ip7dG.tFtqx4bNtirZbVa9NckOywzkgYSDQNa', //test123
//     name: 'Ellie',
//     email: 'ellie@naver.com',
//     url: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664__340.jpg',
//   },
// ];
import { db } from '../db/database.js';

export async function findUser(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then((result) => result[0][0]);
}

export async function findById(userId) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [userId]) //
    .then((result) => {
      // console.log('@@@', result[0]);
      return result[0][0];
    });
}

export async function createUser(username, password, name, url, email) {
  return db
    .execute(
      'INSERT INTO users (username, password, name, url, email) VALUES(?,?,?,?,?)',
      [username, password, name, url, email]
    ) //
    .then((result) => result[0].insertId);
  // return user.userId;
}
