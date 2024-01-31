import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      res.status(500).send("Access denied");
    } else {
      jwt.verify(token, "SECRET", (err, decoded) => {
        if (err) {
          res.status(500).send({ err: err.message });
        } else {
          console.log(decoded);
          req.body = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
