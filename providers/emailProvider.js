const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* SEND SIGNUP EMAIL WITH LOGIN ID + PASSWORD + NAME */
exports.sendSignupEmail = async ({ email, name, login_id, password }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome! Your Account Has Been Created ✔",
    html: `
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;
      border:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;">

  <div style="background:#ff4da6;padding:20px;border-radius:10px 10px 0 0;
              text-align:center;color:white;">
    <h1 style="margin:0;font-size:26px;">💄 Makeup & Nails Studio</h1>
    <p style="margin:0;font-size:14px;opacity:0.9;">Your beauty, our responsibility</p>
  </div>

  <div style="padding:25px;color:#333;line-height:1.6;">

    <h2 style="margin-top:0;color:#ff007f;">Welcome ${name}!</h2>

    <p>Your account has been successfully created.<br>
       Please keep your login details safe.</p>

    <div style="background:#fff5fa;padding:15px;border-radius:8px;
                border-left:5px solid #ff4da6;margin:20px 0;">
      <p style="margin:5px 0;"><b>Name:</b> ${name}</p>
      <p style="margin:5px 0;"><b>Login ID:</b> ${login_id}</p>
      <p style="margin:5px 0;"><b>Password:</b> ${password}</p>
    </div>

    <p>If this was not you, please contact support immediately.</p>

    <a href="#" style="
      display:inline-block;
      background:#ff4da6;
      color:white;
      padding:12px 25px;
      border-radius:6px;
      text-decoration:none;
      font-weight:bold;
      margin-top:15px;">
      Go to Login →
    </a>

  </div>

  <div style="background:#f8f8f8;padding:15px;text-align:center;
              font-size:13px;color:#555;border-radius:0 0 10px 10px;">
    © 2025 Makeup & Nails Booking • All Rights Reserved  
  </div>
</div>
    `
  });
};
exports.sendBookingEmail = async ({ email, name, service_type, service_name, date, time, notes }) => {

  const html = `
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;
              border:1px solid #e8e8e8;font-family:Arial,Helvetica,sans-serif;">

    <div style="background:#ff4da6;padding:20px;border-radius:10px 10px 0 0;
                text-align:center;color:white;">
      <h1 style="margin:0;font-size:26px;">💅 Booking Confirmation</h1>
      <p style="margin:0;font-size:14px;">Makeup & Nails Studio</p>
    </div>

    <div style="padding:25px;color:#333;line-height:1.6;">
      <h2 style="margin-top:0;color:#ff007f;">Hello ${name},</h2>

      <p>Your booking has been successfully created. Below are your booking details:</p>

      <div style="background:#fff5fa;padding:15px;border-radius:8px;
                  border-left:5px solid #ff4da6;margin:20px 0;">

        <p style="margin:5px 0;"><b>Service Type:</b> ${service_type}</p>
        <p style="margin:5px 0;"><b>Service Name:</b> ${service_name}</p>
        <p style="margin:5px 0;"><b>Date:</b> ${date}</p>
        <p style="margin:5px 0;"><b>Time:</b> ${time}</p>
        <p style="margin:5px 0;"><b>Notes:</b> ${notes || "N/A"}</p>

      </div>

      <p>We will contact you soon to confirm your appointment.</p>

      <a href="#" style="
        display:inline-block;
        background:#ff4da6;
        color:white;
        padding:12px 25px;
        border-radius:6px;
        text-decoration:none;
        font-weight:bold;
        margin-top:15px;">
        View My Bookings →
      </a>

    </div>

    <div style="background:#f8f8f8;padding:15px;text-align:center;
                font-size:13px;color:#555;border-radius:0 0 10px 10px;">
      © 2025 Makeup & Nails Booking • All Rights Reserved
    </div>

  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Booking Created: ${service_name}`,
    html
  });
};