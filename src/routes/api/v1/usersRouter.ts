import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "@/controllers/usersController";
import express from "express";
import {
  authorizePermissions,
  authenticateUser,
} from "@/middleware/authentication";

let router;
const userRouter = (router = express.Router());

/* GET users listing. */
router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

export default userRouter;
