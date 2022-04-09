import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { city, county } = req.body;
        const mods = await Account.find({
          role: "MODERATOR",
          "location.county": county,
          "location.city": city,
        });
        res.status(200).json({ status: "SUCCESS", count: mods.length });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const { city, county } = req.body;
        const users = await Account.find({
          "verified.status": "APPROVED",
          role: "USER",
          "location.county": county,
          "location.city": city,
        }).select("-password -verified -location");
        const mods = await Account.find({
          role: "MODERATOR",
          "location.county": county,
          "location.city": city,
        }).select("-password -verified -location");
        res.status(200).json({ status: "SUCCESS", users, mods });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;
    default:
      break;
  }
}
