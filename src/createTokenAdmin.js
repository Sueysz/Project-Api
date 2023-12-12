import jwt from "jsonwebtoken";

export function createTokenAdmin() {
  const secretKey = process.env.TOKEN_SECRET;

  const payload = {
    role: "Admin"
  };

  if (!secretKey) {
    console.error('JWT secret key is missing!');
    process.exit(1);
  }

  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

  return token;
}