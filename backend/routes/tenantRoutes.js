import express from "express"
import auth from "../middleware/auth.js"
import roleAuthorize from "../middleware/role.js"
import { tenantUpgrade } from "../controllers/tenantController.js"


const router = express.Router()

router.post("/:slug/upgrade", auth, roleAuthorize(['Admin']), tenantUpgrade);


export default router