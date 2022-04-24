import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const { location } = await Account.findById(id);
        const posts = await Post.find({ location });
        const updated = [];
        const users = await Account.find({ location }).select(
          "-password -verified"
        );
        posts.forEach((post) => {
          const author = users.filter((user) => user.posts.includes(post._id));
          if (post.reports.length)
            updated.push({ ...post._doc, author: author[0] });
        });
        res.status(200).json({ status: "SUCCESS", posts: updated });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    case "PATCH":
      try {
        const { reason } = req.body;
        const post = await Post.findById(id);
        if (!post.reports.includes(reason)) {
          await Post.findByIdAndUpdate(id, { $push: { reports: reason } });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        await Post.findByIdAndUpdate(id, { reports: [] });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "DELETE":
      try {
        const deleted = await Post.findByIdAndDelete(id);
        await Account.findByIdAndUpdate(deleted.authorID, {
          $pull: { posts: deleted._id },
        });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
