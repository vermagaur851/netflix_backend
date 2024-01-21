import express from "express";
import { logOutUser, loginUser } from "../controller/user.controller";
import { verifyjwt } from "../middleware/auth.middleware";


const router = express.Router()

router.route('/register').post()

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyjwt, logOutUser)

export default router