import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const post = await Post.findById(id);
        const author = await Account.findById(post.authorID).select(
          "-password -verified"
        );
        res
          .status(200)
          .json({ status: "SUCCESS", post: { ...post._doc, author } });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    case "PATCH":
      try {
        const { title, desc, files } = req.body;
        await Post.findByIdAndUpdate(id, { title, desc, files });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    case "DELETE":
      try {
        await Post.findByIdAndDelete(id);
        // await Account.updateMany(
        //   { favorites: id },
        //   { favorites: { $pull: id } }
        // );
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
