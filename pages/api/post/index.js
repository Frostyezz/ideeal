import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "PUT":
      try {
        const { location } = req.body;
        const posts = await Post.find({ location });
        res.status(200).json({ status: "SUCCESS", count: posts.length });
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
          upvoters: [],
        });
        const saved = await post.save();
        const user = await Account.findById(draft.authorID);
        user.posts.push(saved._id);
        await Account.findByIdAndUpdate(user._id, { posts: user.posts });
        res.status(200).json({ status: "SUCCESS", post: saved });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
