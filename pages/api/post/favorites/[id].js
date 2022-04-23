import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find({ favorites: id });
        const { location } = await Account.findById(id);
        const users = await Account.find({ location }).select(
          "-password -verified"
        );
        const updated = [];
        posts.forEach((post) => {
          const author = users.filter((user) => user.posts.includes(post._id));
          updated.push({ ...post._doc, author: author[0] });
        });
        res.status(200).json({ status: "SUCCESS", posts: updated });
      } catch (error) {
        console.log(error);
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    default:
      break;
  }
}
