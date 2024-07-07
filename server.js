require(`dotenv`).config()
require(`./config/dbConfig`)
const express = require(`express`)
const app = express()
app.use(express.json())
const port = process.env.port || 3322
const router = require(`./router/userRouter`)
app.use(`/api/v1/user`,router)

app.listen(port,()=>{
    console.log(`App is currently running & connected on port: ${port}`);
})