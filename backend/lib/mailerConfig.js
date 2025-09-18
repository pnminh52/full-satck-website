import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Dùng Gmail service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // 16 ký tự App Password liền
  },
});

export const sendResetPasswordEmail = async (to, resetLink) => {
  const info = await transporter.sendMail({
    from: `"Anime Shop" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset Your Password",
    html: `<p>Click this link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });
  console.log("Message sent:", info.messageId);
};
