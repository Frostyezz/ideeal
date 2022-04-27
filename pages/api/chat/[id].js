import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Chat from "../../../models/Chat";

import Pusher from "pusher";

export default async function handler(req, res) {
  const pusher = new Pusher({
    appId: "1402133",
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true,
  });
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "PATCH":
      try {
        const { message } = req.body;
        //await Chat.findByIdAndUpdate(id, { $push: { messages: message } });

        pusher.trigger(id, "message", {
          message: JSON.stringify(message),
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
