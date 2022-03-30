import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const account = await Account.findOne({ email });
        if (!account) res.status(200).json({ status: "FAILED" });
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          const user = { ...account._doc, password: null };
          res.status(200).json({ status: "SUCCESS", user });
        } else res.status(200).json({ status: "FAILED" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
