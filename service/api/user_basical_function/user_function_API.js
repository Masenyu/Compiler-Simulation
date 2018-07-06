var models = require('../../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../../db/sqlMap_new');
var MailService = require('../MailService')

var conn = mysql.createConnection(models.mysql);

var sender = '13427532895';
var code = 'qq594978168';
// var recipient = '3556350883@qq.com'
// var verCode = '123456'
var mailService = MailService(sender, code);
// mailService.resetPassword(recipient, verCode);

conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.send('err');
  } else {
    console.log(ret);
    res.send(ret);
  }
}



var dateStr = function(str) {
  return new Date(str.slice(0,7));
}

//生成验证码接口  ///  /api/user_function/generateVerificationCode
//输入：邮箱
//随机生成一个6位验证码
//遍历验证码表，如果邮箱已存在，则将该邮箱的验证码更新
//               邮箱不存在，则插入邮箱和验证码到验证码表格，属性为1//



// 用户注册接口    //  /api/user_function/generateVerificationCode                     /*1为注册用，2为忘记密码 */
//调用完验证码接口
// 输入：1studentName 2studentID 3password 4email  5verificationCode 6verificationAttribute用户输入的验证码和验证码的属性
//         判断studentID是否存在  存在   则返回state = 0   message :"学号已经被注册"
//                              不存在  如果验证码和属性正确  插入数据库 返回state=1 message:"注册成功"
//                                     如果验证码或属性不正确  返回state = -1   message :"验证码错误"
//

//登陆成功后更改密码 /api/user_function/modifyPassword
//输入: studentID old_password new_password
//    (判断学号是否存在0.0)     判断旧密码是否正确0.0   正确则将密码重置为新密码 返回state=1 message=“修改成功”
//                              错误则返回state=0  message=“密码错误”

//登录   /api/user_function/login
//输入studentID password
//     验证 studentID password
//         判断studentID是否存在
//                              存在   密码如果正确则返回state = 1   message :"验证成功"  data=[studentName,studentID,email]
//                                            错误   state = -1    message :"密码错误"
//                              不存在 则返回state = 0   message :"学号不存在"

//忘记密码 /api/user_function/forgetPasswordGetVerificationCode  你输入学号   向邮箱发邮件  输入验证码  0.0
//输入：studentID
//    判断studentID是否存在  存在 返回1
// 随机生成验证码并发送到该账号绑定的邮箱
// 将验证码和邮箱插入到验证码表格，属性为2
// 返回是否发送验证码成功       返回1~~

//                         不存在 返回0


//修改密码（忘记密码）api/user_function/modifyPasswordOfForgetPassword
//输入：studentID ，verificationCode verificationAttribute（2）， new_password
//判断验证码和属性是否正确   都正确  则修改密码 返回state=1，message=“修改密码成功”
//                       其一不正确 则返回state=0，message=“验证码错误”
//


//用户新增收藏 接口  用户点击收藏按钮  添加数据 /api/user_function/collectionADD
//输入 studentID data_content 0，1，2 （词法）
//查找到用户  并且插入 ID自增的ID  插入数据(studentID  collectionID collectionType )
//返回state = 1  message:"收藏成功"
router.post('/collectionAdd', (req, res) => {
  var params=req.body;
  var sqlAdd="INSERT INTO user_collection(`studentID`,`collectionType`,`data_content`,`displayOrNot`) VALUES ?"
//var studentID=params.studentID
//var data_content=params.data_content
  var values =   [
    [params.studentID,params.collectionType,params.data_content,params.data_content,1]
  ];
  conn.query(sqlAdd,values, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


//获取用户收藏信息接口/api/user_function/collectionQuery
//输入 stutendID
//返回 studentID ,collectionID，collectionType，data_content，displayOrNot
//  true才传过来  false

router.post('/collectionQuery', (req, res) => {
  var params=req.body;
  var sqlSelect="SELECT * FROM user_collection WHERE studentID=? AND displayOrNot=1"

  conn.query(sqlSelect,params.studentID, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


//用户删除收藏接口/api/user_function/collectionDelete
//输入 studentID,collectionID
//将该条收藏记录的displayOrNot设置为0
router.post('/collectionDelete', (req, res) => {
  var params=req.body;
  var sqlUpdate='UPDATE user_collection SET displayOrNot = 0 WHERE studentID = ? AND collectionID=?'
  var Sql_Params = [params.studentID,params.collectionID];
  conn.query(sqlUpdate,Sql_Params, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});


var sqlSelect='INSERT INTO user_collection(`studentID`,`collectionType`,`data_content`,`displayOrNot`) VALUES ?'
var params =[['201530613702',1,'143214213',true]];
conn.query(sqlSelect,[params], function(err, result) {
  if (err) {
    console.log(err);
  }
  if (result) {
    console.log(result);
  }
})
module.exports = router;
