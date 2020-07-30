const mongoURL='mongodb://kbpark9898:park0130@boiler-plate-shard-00-00.m8yyl.mongodb.net:27017,boiler-plate-shard-00-01.m8yyl.mongodb.net:27017,boiler-plate-shard-00-02.m8yyl.mongodb.net:27017/boiler-plate?ssl=true&replicaSet=atlas-nkbm0s-shard-0&authSource=admin&retryWrites=true&w=majority';
const express=require('express')
const bodyparaser = require('body-parser')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose');
const {Users} = require('./DB/Users');
const port = 5000;
const app = express();
app.use(bodyparaser.urlencoded({extended:true}));
app.use(bodyparaser.json());
app.use(cookieparser());
mongoose.connect(mongoURL,{
    useUnifiedTopology:true, useCreateIndex:true, useNewUrlParser:true, useFindAndModify:false
}).then(()=>console.log("connect sucess!!"))
  .catch(err=>console.log(err));
app.get('/', (req,res)=>res.send("안녕하세요! 연결되나요??"))

//회원가입 api
app.post('/api/user/register', (req, res)=>{
    var user = new Users(req.body);
    user.save((err, userInfo)=>{
        if (err) return res.json({success:false, err})
        return res.status(200).json({success:true})
    })
})
// app.post('/api/user/register', (req,res)=>{
//     var user = new Users(req.body)
//     user.save((err, userInfo)=>{
//         if(err) return res.json({success:false, err})
//         return res.status(200).json({success:true})
//     })
// })


app.listen(port, ()=>console.log("example running..")) //노드 프로젝트 만들때 반드시 listen 설정! 잊지말기!!




