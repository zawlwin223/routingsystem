module.exports=(express)=>{
    let route = express.Router()
     route.get("/home",(req,res)=>{
        res.send("This is user home")
     })
     return route;
}