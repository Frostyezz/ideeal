import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Chat from "../../../../models/Chat";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { sender, recipient } = req.body;
        const user = await Account.findById(sender);
        if (user.requests?.includes(recipient)) {
          await Account.findByIdAndUpdate(sender, {
            $push: { friends: recipient },
            $pull: { requests: recipient },
          });
          await Account.findByIdAndUpdate(recipient, {
            $push: { friends: sender },
            $pull: { requests: sender },
          });
          const chat = new Chat({
            users: [sender, recipient],
            messages: [],
          });
          await chat.save();
        } else {
          await Account.findByIdAndUpdate(recipient, {
            $push: { requests: sender },
          });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const { sender, recipient } = req.body;
        const user = await Account.findById(sender);
        if (user.friends?.includes(recipient)) {
          await Account.findByIdAndUpdate(sender, {
            $pull: { friends: recipient },
          });
          await Account.findByIdAndUpdate(recipient, {
            $pull: { friends: sender },
          });
          await Chat.findOneAndDelete({ $all: { users: [sender, recipient] } });
        } else {
          await Account.findByIdAndUpdate(recipient, {
            $pull: { requests: sender },
          });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
