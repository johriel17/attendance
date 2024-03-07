import express from 'express'
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmplooyee } from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', createEmployee)

router.put('/:id', updateEmployee)

router.delete('/:id', deleteEmplooyee)


export default router