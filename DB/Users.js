const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
var jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        unique:1,
        trim:true
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    image:String,
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save', function(next){
    var usr = this;
    if(usr.isModified('password')){
        bcrypt.genSalt(saltRound, (err, salt)=>{
            if(err) return next(err);
            bcrypt.hash(usr.password, salt, (err, hash)=>{
                if(err) return next(err);
                usr.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

// userSchema.pre('save', function(next){
//     var usr = this;
//     if(usr.isModified('password')){
//         bcrypt.genSalt(saltRound, (err, salt)=>{
//             if(err) return next(err);
//             bcrypt.hash(usr.password, salt, (err, hash)=>{
//                 if(err) return next(err);
//                 usr.password = hash;
//                 next();
//             })
//         })
//     }else{
//         next();
//     }
// })

userSchema.methods.passwordCompare = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, (err, isMatch)=>{
        if(err) return (err)
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err, userData)=>{
        if(err) return cb(err);
        return cb(null, userData);
    })
}

userSchema.methods.findbyToken = function(token, cb){
    var user = this;
    
}
const Users = mongoose.model("Users", userSchema);
module.exports={Users};