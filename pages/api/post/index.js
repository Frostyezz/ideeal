import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find();
        res.status(200).json({ status: "SUCCESS", posts });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    case "POST":
      try {
        const { draft } = req.body;
        const post = new Post({
          ...draft,
          comments: [],
          upvotes: 0,
        });
        const saved = await post.save();
        res.status(200).json({ status: "SUCCESS", post: saved });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
