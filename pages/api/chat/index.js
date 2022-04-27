import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import Chat from "../../../models/Chat";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { sender, recipient } = req.body;
        const chat = await Chat.findOne({
          $all: { users: [sender, recipient] },
        });
        res.status(200).json({ status: "SUCCESS", chat });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
