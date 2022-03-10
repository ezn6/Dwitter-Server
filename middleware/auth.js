import jwt from 'jsonwebtoken';
import * as userDB from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log(authHeader); -> header의 key, val중 val값 전체임
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(' ')[1];

  //TODO: Make it secure!
  jwt.verify(
    token,
    'ppMWFaXXaf9djP2Z*euoL9JBl^nLedBI',
    async (err, decoded) => {
      if (err) {
        // console.log('one');
        return res.status(401).json(AUTH_ERROR);
      }

      // console.log(decoded);
      // 유효한 토큰임이 검증되면 payload정보를 통해 userId정보로 DB에서 사용자 정보를 끌어온다.
      const user = await userDB.findById(decoded.userId);

      if (!user) {
        // console.log('two');
        return res.status(401).json(AUTH_ERROR);
      }

      req.userId = user.userId; //req에 객체성분 추가해주는것
      req.token = token;

      next();
    }
  );
};
