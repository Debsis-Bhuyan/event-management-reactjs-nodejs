import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const createToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { createToken, verifyToken };
