import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "POST":
      try {
        const updated = await Account.findByIdAndUpdate(id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          img: req.body.img,
        });
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const updated = await Account.findByIdAndUpdate(id, {
          location: {
            city: req.body.city,
            county: req.body.county,
            verified: {
              status: "PENDING",
              ic: req.body.ic,
            },
          },
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
