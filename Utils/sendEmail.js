const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, PasswordReset, StringReset, String) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: 2525,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: `<p>Hii Please Click the link for <a href=${StringReset}>Verify your String</a> </p>
					<P><a href=${PasswordReset}>PasswordReset</a></p>
					<p>Your Random String Value: ${String}</p>`,

		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

module.exports = sendEmail;



