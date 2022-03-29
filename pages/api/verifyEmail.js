import dbConnect from "../../util/dbConnect";
import Account from "../../models/Account";
import EmailStatuse from "../../models/EmailStatus";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_KEY);

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const exists = await Account.find({ email: req.body.email });
        if (exists[0]) return res.status(200).json({ status: "DUPLICATED" });

        const hash = await bcrypt.hash(req.body.password, 10);
        const token = uuidv4();

        const html = `
            <body>
            Codul tău de confirmare este:
            <br /><br />
            <b>${token}</b>
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: req.body.email,
          from: "ideero@robertmoraru.live",
          subject: "Ideero: Cod de Confirmare Email",
          message: `Codul tău de confirmare este: ${token}`,
          html,
        };
        mail.send(data);
        const account = new Account({
          email: req.body.email,
          password: hash,
          verified: {
            email: false,
          },
        });
        const saved = await account.save();
        const verify = await EmailStatuse({
          id: saved._id,
          token,
        });
        verify.save();
        res.status(200).json({ status: "SUCCESS", id: saved._id });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PATCH":
      try {
        const token = uuidv4();
        await EmailStatuse.findOneAndUpdate({ id: req.body.id }, { token });
        const html = `
            <body>
            Noul tău cod de confirmare este:
            <br /><br />
            <b>${token}</b>
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;
        const account = await Account.findById(req.body.id);
        const data = {
          to: account.email,
          from: "ideero@robertmoraru.live",
          subject: "Ideero: Cod de Confirmare Email",
          message: `Noul tău cod de confirmare este: ${token}`,
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
        const match = await EmailStatuse.findOneAndRemove({
          token: req.body.token,
        });
        if (match) {
          const html = `
            <body>
            Adresa de email a fost verificată cu succes!
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;
          const account = await Account.findByIdAndUpdate(match.id, {
            verified: { email: true },
          });
          const data = {
            to: account.email,
            from: "ideero@robertmoraru.live",
            subject: "Ideero: Verificare adresă de email",
            message: `Adresa de email a fost verificată cu succes!`,
            html,
          };
          mail.send(data);
          res.status(200).json({ status: "SUCCESS" });
        } else res.status(200).json({ status: "FAILED" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    default:
      break;
  }
}
