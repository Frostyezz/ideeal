import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "PATCH":
      try {
        const { reason } = req.body;
        await Post.findByIdAndUpdate(id, { $push: { reports: reason } });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
