import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const friends = await Account.find({
          friends: {
            $in: id,
          },
        }).select("img firstName lastName _id");
        const received = await Account.findById(id).select("requests");
        const requests = await Account.find({
          _id: {
            $in: received.requests,
          },
        }).select("img firstName lastName _id");
        res.status(200).json({ status: "SUCCESS", friends, requests });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
