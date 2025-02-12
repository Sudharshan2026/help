import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bshanth0206@gmail.com',
    pass: 'weje wscl yaoc jcnc'
  }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const info = await transporter.sendMail({
      from: '"Sri Sairam Engineering College" <bshanth0206@gmail.com>',
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});