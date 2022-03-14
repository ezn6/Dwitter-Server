import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    // null, undefined일때 둘다 잡는다, null==undefined
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800)),
    // expiresInSec: process.env.JWT_EXPIRES_SEC,
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
};
