import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import usersRoutes from "./routes/userRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import errorHandler from './middlewares/errorMiddleware.js'



dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

// UserRoutes - create user, get user, get all users
app.use("/api/v1/users", usersRoutes)

// Account Routes - create account, get user account, get all user account
app.use("/api/v1/accounts", accountRoutes)

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

connectDB().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`server is runnig on port: ${PORT}`)
    })
})

