import connectDB from "@/lib/connectDB";
import authMiddleware from "@/lib/authMiddleware";
import User from "@/models/User";

async function handler(req, res) {
  await connectDB();
  const user = await User.findById(req.user.userId).select("-password");
  res.status(200).json(user);
}

export default authMiddleware(handler);
