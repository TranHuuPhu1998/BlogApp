import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index'
import nocache from 'nocache'


// middleware
const app = express()
app.use(nocache());
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api' , routes.authRouter)
app.use('/api' , routes.userRouter)
app.use('/api' , routes.categoryRouter)

import './config/database'

// server listenning
const POST = process.env.PORT || 5000
app.listen(POST , () => {
    console.log('Server is running on port' , POST)
})
