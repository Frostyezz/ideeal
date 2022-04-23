import { serialize } from "cookie";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const serialised = serialize("IdeeROJWT", null, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    default:
      break;
  }
}
