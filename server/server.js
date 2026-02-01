import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config()
connectDB()

const app=express()
app.use(cors())
app.use(express.json())

app.use('/api/menu',menuRoutes)
app.use('/api/orders',orderRoutes)

app.listen(process.env.PORT,()=>console.log(`server running on ${process.env.PORT}`))