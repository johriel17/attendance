import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose'
import express  from 'express'
import cors from 'cors'


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// const JWT_SECRET = process.env.JWT_SECRET;

//routes
import dtrsRoute from './routes/dtrsRoute.js'
import usersRoute from './routes/userRoute.js'
import employeesRoute from './routes/employeeRoute.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/dtrs', dtrsRoute)
app.use('/api/users', usersRoute)
app.use('/api/employees', employeesRoute)


mongoose
.connect(MONGO_URI)
.then(() =>{
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`Listining to port ${PORT}`)
    })
})
.catch((error) =>{
    console.log(error)
})