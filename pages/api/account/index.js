import dbConnect from "../../../util/dbConnect";
import Account from "../../../models/Account";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
const secret = process.env.JWT_SECRET;

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
          if (user.verified.status === "APPROVED") {
            const token = await new SignJWT({ role: user.role })
              .setProtectedHeader({
                alg: "HS256",
              })
              .setJti(nanoid())
              .setIssuedAt()
              .setExpirationTime("30d")
              .sign(new TextEncoder().encode(secret));
            const serialised = serialize("IdeeROJWT", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 60 * 60 * 24 * 30,
              path: "/",
            });
            res.setHeader("Set-Cookie", serialised);
          }
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
