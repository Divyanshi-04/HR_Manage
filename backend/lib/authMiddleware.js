import jwt from "jsonwebtoken";

export default function authMiddleware(handler) {
  return async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
