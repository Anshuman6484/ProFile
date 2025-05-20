import express from 'express'
import dotenv from 'dotenv' // Environment variables
import morgan from 'morgan' // HTTP request logger
import cors from 'cors' // Cross-Origin Resource Sharing
import resumeRoutes from './routes/resumeRoutes.js'

// App
const app = express()

// Environment variables
dotenv.config()

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) // JSON parser

// Routes
app.use('/api', resumeRoutes)

export default app
