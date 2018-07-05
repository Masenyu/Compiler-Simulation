function MailService(qq, code) {
	let nodemailer = require("nodemailer");
	let transporter = nodemailer.createTransport(`smtps://${qq}:${code}@smtp.qq.com`);
	return {
		resetPassword: function (recipient, verCode) {
			let mailOptions = {
				from: `<${qq}@qq.com>`,
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
					return error;
				}
				return true;
			})
		},
		createAccount: function (recipient, verCode) {
			let mailOptions = {
				from: `<${qq}@qq.com>`,
				to: recipient,
				subject: '文法分析模拟器 - 重置密码',
				text: 'Compiler Simulation',
				html: `<b>您的验证码是：${verCode}</b><br/>
							<b>祝您愉快！</b><br/>
							<b>Team scutbanks</b>`
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return error;
				}
				return true;
			})
		},
	}
}
module.exports = MailService;


// var qq = '2369969039';
// var code = 'rgafqfcwwindebgd';
// var recipient = '835380624@qq.com'
// var verCode = 'hwllo world'
// var mailService = MailService(qq, code);
// mailService.resetPW(recipient, verCode);