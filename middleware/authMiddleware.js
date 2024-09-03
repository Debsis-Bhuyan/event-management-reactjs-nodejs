import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
