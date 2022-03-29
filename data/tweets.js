import * as userDB from '../data/auth.js';
import { db } from '../db/database.js';

// let tweets = [
//   {
//     id: '1', //postId
//     text: '드림코더분들 화이팅!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: '안뇽!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '3',
//     text: '아이스 아메리카노 🥃',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
// ];

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE us.username=? ${ORDER_DESC}`, [username]) //
    .then((result) => result[0]);
}

export async function findById(id) {
  //해당 postId에 따른 트윗 글 한개만 보여짐
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]) //
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, userId) VALUES(?,?)', [text, userId]) //
    .then((result) => findById(result[0].insertId)); //만들고 나서 사용자에게는 url, name과같은 정보를 보여줘야하니까 findById함수로 리턴
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets t SET t.text = ? WHERE t.id = ?', [text, id]) //
    .then(() => findById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id = ?', [id]);
}
