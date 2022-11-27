module.exports=(express,app)=>{
    let route = express.Router()
    let hogan = require ("hogan-express")
    app.use(express.static('public'))
    app.engine("html",hogan)
    app.set("view engine","html")

     route.get("/home",(req,res)=>{
        res.render("index")
     })
     return route;
}