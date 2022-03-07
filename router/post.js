import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweets.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// DB없이 메모리로 서버 구성하는 version

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
];

//전체 트윗 조회 api + 특정 유저 트윗 조회
router.get('/', tweetController.getTweets);

//특정 트윗 찾기
router.get('/:id', tweetController.getTweet);

//트윗 작성
router.post('/', validateTweet, tweetController.createTweet);

//트윗 수정
router.put('/:id', validateTweet, tweetController.updateTweet);

//트윗 삭제
router.delete('/:id', tweetController.removeTweet);

export default router;
