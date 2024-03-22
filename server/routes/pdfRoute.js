import  express  from "express"
import { attendancePdf } from "../controllers/pdfController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)
router.use(adminOnly)

router.get('/attendances/:dtrId', attendancePdf)


export default router