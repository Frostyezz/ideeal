import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { city, county } = req.body;
        const users = await Account.find({
          "verified.status": "APPROVED",
          role: "USER",
          "location.county": county,
          "location.city": city,
        }).select("-password -verified -location");
        const admin = await Account.findOne({
          role: "ADMIN",
          "location.county": county,
          "location.city": city,
        }).select("-password -verified -location");
        res.status(200).json({ status: "SUCCESS", users, admin });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PATCH":
      try {
        const { userID, adminID } = req.body;
        const admin = await Account.findByIdAndUpdate(userID, {
          role: "ADMIN",
        });
        if (adminID) {
          const user = await Account.findByIdAndUpdate(adminID, {
            role: "USER",
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
