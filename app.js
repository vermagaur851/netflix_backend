import express from 'express'
import authRoute from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use("/api/auth",authRoute)
app.use(cookieParser())

export default app