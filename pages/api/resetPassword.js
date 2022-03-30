import dbConnect from "../../util/dbConnect";
import Account from "../../models/Account";
import PasswordStatuse from "../../models/PasswordStatus";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_KEY);

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { email } = req.body;
        const found = await Account.findOne({ email });
        if (found) {
          const token = uuidv4();
          const exists = await PasswordStatuse.findOne({ email });
          if (!exists) {
            const status = new PasswordStatuse({
              token,
              email,
            });

            await status.save();
          } else {
            await PasswordStatuse.findOneAndUpdate({ email }, { token });
          }

          const html = `
            <body>
            Codul tău de resetare a parolei este:
            <br /><br />
            <b>${token}</b>
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

          const data = {
            to: email,
            from: "ideero@robertmoraru.live",
            subject: "Ideero: Cod de Resetare Parolă",
            message: `Codul tău de resetare a parolei este: ${token}`,
            html,
          };
          mail.send(data);
          res.status(200).json({ status: "SUCCESS" });
        } else res.status(200).json({ status: "FAILED" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PATCH":
      try {
        const { email } = req.body;
        const token = uuidv4();
        const updated = await PasswordStatuse.findOneAndUpdate(
          { email },
          { token }
        );
        const html = `
            <body>
            Noul tău cod de resetare a parolei este:
            <br /><br />
            <b>${token}</b>
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: email,
          from: "ideero@robertmoraru.live",
          subject: "Ideero: Cod de Resetare Parolă",
          message: `Noul tău cod de resetare a parolei este: ${token}`,
          html,
        };
        mail.send(data);
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    case "PUT":
      try {
        const { token } = req.body;
        const deleted = await PasswordStatuse.findOneAndRemove({ token });
        if (deleted) {
          res.status(200).json({ status: "SUCCESS" });
        } else {
          res.status(200).json({ status: "FAILED" });
        }
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    default:
      break;
  }
}
