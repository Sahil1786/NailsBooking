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


exports.sendAdminBookingEmail = async ({
  adminEmail,
  user_name,
  user_email,
  user_mobile,
  service_type,
  service_name,
  date,
  time,
  notes
}) => {

  const html = `
  <div style="max-width:650px;margin:0 auto;background:#ffffff;border-radius:14px;
              border:1px solid #f0d0e4;font-family:Arial,Helvetica,sans-serif;
              box-shadow:0 4px 20px rgba(0,0,0,0.08);">

    <!-- HEADER SECTION -->
    <div style="background:linear-gradient(135deg,#ff80bf,#d63384);
                padding:30px;text-align:center;border-radius:14px 14px 0 0;color:white;">
      <h1 style="margin:0;font-size:30px;font-weight:bold;letter-spacing:1px;">
        💖 New Booking Alert!
      </h1>
      <p style="margin:5px 0 0;font-size:16px;opacity:0.9;">
        Makeup & Nails Booking Management
      </p>
    </div>

    <!-- BODY SECTION -->
    <div style="padding:28px;color:#333;line-height:1.7;">

      <h2 style="color:#d63384;margin-top:0;font-size:22px;">
        Customer Details 👩‍🦰
      </h2>

      <div style="background:#fff0f6;border-left:5px solid #d63384;
                  padding:15px;margin-bottom:25px;border-radius:8px;">
        <p style="margin:6px 0;"><b>Name:</b> ${user_name}</p>
        <p style="margin:6px 0;"><b>Email:</b> ${user_email}</p>
        <p style="margin:6px 0;"><b>Mobile:</b> ${user_mobile}</p>
      </div>

      <h2 style="color:#d63384;margin-top:0;font-size:22px;">
        Booking Details 💅
      </h2>

      <div style="background:#fef4ff;border-left:5px solid #a64cc2;
                  padding:15px;margin-bottom:25px;border-radius:8px;">
        <p style="margin:6px 0;"><b>Service Type:</b> ${service_type}</p>
        <p style="margin:6px 0;"><b>Service Name:</b> ${service_name}</p>
        <p style="margin:6px 0;"><b>Date:</b> ${date}</p>
        <p style="margin:6px 0;"><b>Time:</b> ${time}</p>
        <p style="margin:6px 0;"><b>Notes:</b> ${notes || "N/A"}</p>
      </div>

      <p style="font-size:15px;color:#555;">
        Kindly login to admin panel to review, approve or modify this booking.
      </p>

      <div style="text-align:center;margin-top:25px;">
        <a href="#" style="
          background:linear-gradient(135deg,#ff4da6,#b30086);
          color:white;padding:12px 28px;border-radius:6px;font-weight:bold;
          text-decoration:none;font-size:16px;display:inline-block;
          box-shadow:0 3px 8px rgba(255,75,160,0.4);">
          Open Admin Panel →
        </a>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background:#faf0f7;padding:15px;text-align:center;
                border-radius:0 0 14px 14px;font-size:13px;color:#7a7a7a;">
      © 2025 Makeup & Nails Studio • Admin Notification Service
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: `💖 New Booking From ${user_name}`,
    html
  });
};

exports.sendStatusChangeEmail = async ({
  email,
  name,
  service_name,
  status,
  date,
  time
}) => {

  const html = `
  <div style="max-width:650px;margin:0 auto;background:#fff;border-radius:12px;
              border:1px solid #ffd2e8;font-family:Arial;">
    <div style="background:linear-gradient(135deg,#ff69b4,#c71585);
                padding:25px;text-align:center;color:#fff;border-radius:12px 12px 0 0;">
      <h2 style="margin:0;">💖 Booking Status Updated</h2>
      <p style="margin:0;opacity:0.9;">Makeup & Nails Studio</p>
    </div>

    <div style="padding:22px;color:#444;">
      <p>Hi <b>${name}</b>,</p>
      <p>Your booking status has been updated:</p>

      <div style="background:#fff0f7;padding:15px;border-radius:8px;
                  border-left:5px solid #ff69b4;margin-bottom:20px;">
        <p><b>Service:</b> ${service_name}</p>
        <p><b>Status:</b> ${status}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      </div>

      <p>If this was not requested, please contact support immediately.</p>
    </div>

    <div style="background:#faf0f7;padding:10px;text-align:center;
                border-radius:0 0 12px 12px;font-size:12px;color:#666;">
      © 2025 Makeup & Nails Studio
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `💖 Your Booking Status is now "${status}"`,
    html
  });
};


exports.sendDateTimeChangeEmail = async ({
  email,
  name,
  service_name,
  date,
  time
}) => {

  const html = `
  <div style="max-width:650px;margin:0 auto;background:#fff;border-radius:12px;
              border:1px solid #e2c8ff;font-family:Arial;">
    <div style="background:linear-gradient(135deg,#a64cc2,#6a0dad);
                padding:25px;text-align:center;color:#fff;border-radius:12px 12px 0 0;">
      <h2 style="margin:0;">⏰ Booking Date/Time Updated</h2>
      <p style="margin:0;opacity:0.9;">Makeup & Nails Studio</p>
    </div>

    <div style="padding:22px;color:#444;">
      <p>Hello <b>${name}</b>,</p>
      <p>Your booking schedule has been updated:</p>

      <div style="background:#f6edff;padding:15px;border-radius:8px;
                  border-left:5px solid #a64cc2;margin-bottom:20px;">
        <p><b>Service:</b> ${service_name}</p>
        <p><b>New Date:</b> ${date}</p>
        <p><b>New Time:</b> ${time}</p>
      </div>

      <p>Please be on time. If you need changes, contact support.</p>
    </div>

    <div style="background:#f3e7ff;padding:10px;text-align:center;
                border-radius:0 0 12px 12px;font-size:12px;color:#666;">
      © 2025 Makeup & Nails Studio
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `⏰ Your Booking Time Has Been Updated`,
    html
  });
};
