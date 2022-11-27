let express = require ("express")
let app     = express()
let guest   = require ("./routing/guestRouting.js")(express,app)
let member  = require ("./routing/memberRouting.js")(express,app)
let user    = require ("./routing/userRouting.js")(express,app)
require ("dotenv").config()

app.use("/guest",guest)
app.use("/member",member)
app.use("/user",user)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})