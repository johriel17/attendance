import  express  from "express"
import { getDtrs, getDtr, createDtr, updateDtr, deleteDtr, getDtrEmployeeSubs, updateEmployeeSub } from "../controllers/dtrController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)

router.get('/', getDtrs)

router.get('/:id', getDtr)

router.post('/', createDtr)

router.put('/:id', updateDtr)

router.delete('/:id', deleteDtr)

router.get('/dtr-employee-subs/:dtrEmployeeId', getDtrEmployeeSubs)

router.post('/save-attendance/:attendanceId', updateEmployeeSub)

export default router