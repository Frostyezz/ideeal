import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_KEY);

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "PATCH":
      try {
        const user = await Account.findByIdAndUpdate(id, {
          role: "USER",
        });
        const html = `
            <body>
            Salutări, ${user.firstName}! Din păcate, nu mai ești moderator!
            <br /><br />
            Administratorul comunității din care faci parte ți-a șters rolul de moderator.
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: user.email,
          from: "ideero@robertmoraru.live",
          subject: "Din păcate, nu mai ești moderator!",
          message: `Administratorul comunității din care faci parte ți-a șters rolul de moderator.`,
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
        const user = await Account.findByIdAndUpdate(id, { role: "MODERATOR" });
        const html = `
            <body>
            Salutări, ${user.firstName}! Acum ești moderator!
            <br /><br />
            Administratorul comunității din care faci parte ți-a acordat rolul de moderator.
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: user.email,
          from: "ideero@robertmoraru.live",
          subject: "Acum ești moderator!",
          message: `Administratorul comunității din care faci parte ți-a acordat rolul de moderator.`,
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
