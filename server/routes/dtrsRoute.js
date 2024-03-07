import  express  from "express"
import { getDtrs, getDtr, createDtr, updateDtr, deleteDtr } from "../controllers/dtrController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)

router.get('/', getDtrs)

router.get('/:id', getDtr)

router.post('/', createDtr)

router.put('/:id', updateDtr)

router.delete('/:id', deleteDtr)

export default router