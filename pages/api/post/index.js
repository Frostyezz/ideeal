import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find();
        const updated = [];
        posts.forEach(async (post) => {
          const author = await Account.findById(post.authorID).select(
            "-password"
          );
          updated.push({ ...post, author });
        });
        res.status(200).json({ status: "SUCCESS", posts: updated });
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
