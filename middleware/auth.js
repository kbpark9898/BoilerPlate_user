const {Users} =require('../DB/Users')

let auth = (req, res, next)=>{
    let token = req.cookies.x_auth;
    User.findbyToken()
}
module.exports={auth};