module.exports=(express,app)=>{
    let route = express.Router()
    let bodyParser = require('body-parser')
    let jwt = require('jsonwebtoken');
    let passport = require ("passport")
    let JwtStrategy = require('passport-jwt').Strategy
    let ExtractJwt = require('passport-jwt').ExtractJwt
    let opts = {}
    let map = new Map()
    const multer  = require('multer')
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './asset/img')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    })
    
    const upload = multer({ storage: storage })

    map.set("zawlwinp223@gmail.com",{email:"zawlwinp223@gmail.com",password:123456,name:"Zaw Lwin Phyo"})
    require ("dotenv").config()
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    let mystrategy= new JwtStrategy(opts, function(payload, done) {
      let user=map.get(payload.email)
        if(user){
          done(null, user)
        }else{
          done(null, false)
        }
  })
  passport.use(mystrategy)

     //login
     route.post("/login",(req,res)=>{
       let email = req.body.email
       let password = req.body.password
       if(email==map.get("zawlwinp223@gmail.com").email){
         if(password==map.get("zawlwinp223@gmail.com").password){
            let payload = {email:email}
            let token = jwt.sign(payload,process.env.SECRET)
            res.json({token:token})
            console.log(token)
         }
       }
      
     })
     //secret upload photo
     route.post("/secret",upload.array('img', 12),passport.authenticate('jwt', { session: false }),(req,res)=>{
     res.send(req.files)
   
     })
     return route;
}