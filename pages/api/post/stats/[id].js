import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const stats = await Post.findById(id).select("upvoters comments");
        res.status(200).json({ status: "SUCCESS", stats });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PATCH":
      try {
        const { comment, upvoter } = req.body;
        if (upvoter) {
          await Post.findByIdAndUpdate(id, { $push: { upvoters: upvoter } });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const { comment, upvoter } = req.body;
        if (upvoter) {
          await Post.findByIdAndUpdate(id, { $pull: { upvoters: upvoter } });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
    default:
      break;
  }
}
