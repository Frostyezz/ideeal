import dbConnect from "../../util/dbConnect";
import Account from "../../models/Account";
import bcrypt from "bcrypt";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_KEY);

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "PATCH":
      try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const updated = await Account.findOneAndUpdate(
          { email },
          { password: hash }
        );
        const html = `
            <body>
            Parola ta a fost resetată cu succes!
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: email,
          from: "ideero@robertmoraru.live",
          subject: "Ideero:  Parola resetată cu succes!",
          message: `Parola ta a fost resetată cu succes!`,
          html,
        };
        mail.send(data);
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
