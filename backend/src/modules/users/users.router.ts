import {Router} from "express";
import {authenticate} from "../../middlewares/authenticate";
import {
  authorizeAdmin,
  authorizeAdminOrSelf,
} from "../../middlewares/authorize";
import {getUser, listUsers, blockUserById} from "./users.controller";

const router = Router();

router.get("/", authenticate, authorizeAdmin, listUsers);
router.get("/:id", authenticate, authorizeAdminOrSelf, getUser);
router.patch("/:id/block", authenticate, authorizeAdminOrSelf, blockUserById);

export default router;
