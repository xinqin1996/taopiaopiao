const express = require("express");
const router = express.Router();
const pool=require("../pool");

//注册接口
router.get("/v1/reg",(req,res)=>{
  var uname=req.query.uname;
  var uphone=req.query.uphone;
  var upwd=md5(req.query.upwd);
  var sql="INSERT INTO tpp_user(uname,uphone,upwd) VALUES(?,?,?)";
  pool.query(sql,[uname,uphone,upwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"reg success"})
    }else{
      res.send({code:0,msg:"reg error"})
    }
  })
})

// 登录验证  通过手机和密码验证 
//通过uphone和upwd查询uil,将结果保存在req.session里面，
router.get("/v1/login",(req,res)=>{
  var uphone=req.query.uphone;
  var upwd=req.query.upwd;
  var sql="SELECT uid FROM tpp_user WHERE uphone=? AND upwd=md5(?)";
  pool.query(sql,[uphone,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:"-1",msg:"用户名或密码错误"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
      req.session.uid=result[0].uid;
      console.log(req.session);
      res.send({code:"1",msg:"登录成功"})
    }
  })
})

// 查看用户是否为在线状态
//创建成功时向服务器发起请求，查看是否存在req.session,
router.get("/v1/islogin",(req,res)=>{
  //获取uid，
  var uid = req.session.uid;
  //如果不存在，无事发生，
  if(!uid){
    res.send({code:-1,msg:"用户未登录"}); 
    return; 
  };
  var sql='SELECT uname FROM tpp_user WHERE uid = ?'
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:"-1",msg:"出现错误，没有找到uname"});
    }else{
      //登录成功 1: 保存凭据在session中，2: 把成功的信息发送给脚手架
       //result=[{uid:1}]
      res.send({code:"1",msg:"用户已经登录",data:result})
    }
  })
})

module.exports=router;
