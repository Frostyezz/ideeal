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
          "verified.status": "APPROVED",
          joined: new Date(),
          role: "USER",
        });
        const html = `
            <body>
            Salutări, ${user.firstName}! Contul tău a fost aprobat!
            <br /><br />
            Acum poți posta idei și probleme referitoare la comunitatea în care trăiești.
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: user.email,
          from: "ideero@robertmoraru.live",
          subject: "Contul tău a fost aprobat!",
          message: `Acum poți posta idei și probleme referitoare la comunitatea în care trăiești.`,
          html,
        };
        mail.send(data);

        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "DELETE":
      try {
        const user = await Account.findByIdAndDelete(id);
        const html = `
            <body>
            Salutări, ${user.firstName}! Din păcate, contul tău a fost respins!
            <br /><br />
            Poți crea un altul, însă ai în vedere să completezi câmpurile corect și să încarci o poză cu buletinul tău.
            <br /><br />
            Îți mulțumim pentru că dorești să contribui pentru o lume mai bună!
            <br /><br />
            </body>
        `;

        const data = {
          to: user.email,
          from: "ideero@robertmoraru.live",
          subject: "Din păcate, contul tău a fost respins!",
          message: `Poți crea un altul, însă ai în vedere să completezi câmpurile corect și să încarci o poză cu buletinul tău.`,
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
