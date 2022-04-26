import dbConnect from "../../../../util/dbConnect";
import Account from "../../../../models/Account";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const stats = await Post.findById(id).select(
          "upvoters comments favorites"
        );
        res.status(200).json({ status: "SUCCESS", stats });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PATCH":
      try {
        const { comment, upvoter, user } = req.body;
        if (upvoter) {
          await Post.findByIdAndUpdate(id, { $push: { upvoters: upvoter } });
          await Account.findByIdAndUpdate(upvoter, {
            $inc: { upvotes: 1 },
          });
        }
        if (comment) {
          await Post.findByIdAndUpdate(id, { $push: { comments: comment } });
          if ("reply" in comment) {
            await Account.findByIdAndUpdate(comment.authorID, {
              $inc: { replies: 1 },
            });
          } else {
            await Account.findByIdAndUpdate(comment.authorID, {
              $inc: { comments: 1 },
            });
          }
        }
        if (user) {
          await Post.findByIdAndUpdate(id, {
            $push: { favorites: user },
          });
          await Account.findByIdAndUpdate(user, {
            $push: { favorites: id },
          });
        }
        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
      break;

    case "PUT":
      try {
        const { comment, upvoter, user } = req.body;
        if (upvoter) {
          await Post.findByIdAndUpdate(id, { $pull: { upvoters: upvoter } });
          await Account.findByIdAndUpdate(upvoter, {
            $inc: { upvotes: -1 },
          });
        }
        if (user) {
          await Post.findByIdAndUpdate(id, {
            $pull: { favorites: user },
          });
          await Account.findByIdAndUpdate(user, {
            $pull: { favorites: id },
          });
        }

        res.status(200).json({ status: "SUCCESS" });
      } catch (error) {
        res.status(200).json({ status: "ERROR", error });
      }
    default:
      break;
  }
}
