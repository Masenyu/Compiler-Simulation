function MailService(sender, code) {
	let nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 25,
        secure: false,
        auth: {
            user: `${sender}@163.com`,
            pass: code
        }
    });
	return {
		createAccount: function (recipient, verCode) {
			let mailOptions = {
				from: `<${sender}@163.com>`,
				to: recipient,
				subject: '文法分析模拟器 - 请确认你的邮箱地址',
				text: 'Compiler Simulation',
				html: `<b>感谢您注册 <文法分析模拟器>！一下是您的注册码</b><br/>
							<b>${verCode}</b><br/>
							<b>祝您愉快！</b><br/>
							<b>Team scutbanks</b>`

			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error)
					return error;
				}
				return true;
			})
		},
    resetPassword: function (recipient, verCode) {
			let mailOptions = {
				from: `${sender}@163.com`,
				to: recipient,
				subject: '文法分析模拟器 - 重置密码',
				text: 'Compiler Simulation',
				html: `<b>您的验证码是：${verCode}</b><br/>
							<b>祝您愉快！</b><br/>
							<b>Team scutbanks</b>`
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error)
					return error;
				}
				return true;
			})
		},
	}
}
module.exports = MailService;
// var sender = '13427532895';
// var code = 'qq594978168';
// var recipient = '3556350883@qq.com'
// var verCode = '123456'
// var mailService = MailService(sender, code);
// mailService.resetPassword(recipient, verCode);
