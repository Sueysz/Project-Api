import jwt from "jsonwebtoken";

export function createTokenBoth() {
  const secretKey = process.env.TOKEN_SECRET;

  const payload = {
    role: "Employee"
  };

  if (!secretKey) {
    console.error('JWT secret key is missing!');
    process.exit(1);
  }

  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

  return token;
}

// a corriger n'arrive pas a ajouter les 2 roles dans le paylod