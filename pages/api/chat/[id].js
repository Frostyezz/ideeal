import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Chat from "../../../models/Chat";

import Pusher from "pusher";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "PATCH":
      try {
        const { message } = req.body;
        await Chat.findByIdAndUpdate(id, { $push: { messages: message } });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
