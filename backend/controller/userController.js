const User = require("../modals/user");
const Category = require("../modals/category");
const Product = require("../modals/product");
const Verification = require("../modals/verification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const insert = async (req, res) => {
  const {
    productId,
    name,
    description,
    price,
    quantityAvailable,
    categoryId,
    sellerId,
    subCategory,
    imageUrl,
  } = req.body;
  if (
    !productId ||
    !name ||
    !description ||
    !price ||
    !quantityAvailable ||
    !categoryId ||
    !sellerId ||
    !subCategory ||
    !imageUrl
  ) {
    console.log("please enter bla bla");
  }
  try {
    const product = await Product.create(req.body);
    res.json({ product, msg: "successfull" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const emailVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser1 = await User.findOne({ email });
    if (existingUser1) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const verificationCode = randomNumber.toString();
    const existingVerification = await Verification.findOne({ email });
    if (
      existingVerification &&
      !existingVerification.used &&
      !hasExpired(existingVerification.expiresAt)
    ) {
      // Reuse existing code if valid (optional)
      console.log("Reusing existing verification code for", email);
      await sendVerificationCodeEmail(
        email,
        existingVerification.verificationCode
      );
      return res
        .status(200)
        .json({ message: "Verification code sent successfully" });
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    const newVerification = new Verification({
      verificationCode,
      email,
      expiresAt,
    });

    await newVerification.save();
    await sendVerificationCodeEmail(email, verificationCode);

    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (err) {
    res.status(400).json({ message: "failed to send verification code" });
  }
};

function hasExpired(expiresAt) {
  return expiresAt < Date.now();
}
const sendVerificationCodeEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail password or an app-specific password
    },
  });

  const mailSuperAdmin = {
    from: "BazzarBee1@gmail.com",
    to: email,
    subject: "Verification Code for SignUp",
    html: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: grey;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Make body fill entire viewport height */
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: left; /* Align content within container to left */
    }
    h1, h4, p {
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #333333;
      font-size: 36px;
      margin-bottom: 10px;
    }
    h4 {
      color: #4CAF50;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #555555;
      font-size: 18px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .code {
      display: flex;
      justify-content: center;
    }
    .digit {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 24px;
      margin: 0 5px;
      width: 10px;
      text-align: center;
    }
    .footer {
      font-style: italic;
      color: #888888;
      margin-top: 20px;
    }
    .logo {
      max-width: 100px;
      margin-bottom: 20px;
    }
    .timer {
      font-size: 20px;
      color: #4CAF50;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <img src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/HomePage%2Flogo.png?alt=media&token=7795117b-a6df-4f43-bfc2-e14859a43fca" alt="Company Logo" class="logo">
      <h1>Hello,</h1>
      <p>To approve the request, please use the verification code below:</p>
      <div class="code">
        <span class="digit">${String(verificationCode).charAt(0)}</span>
        <span class="digit">${String(verificationCode).charAt(1)}</span>
        <span class="digit">${String(verificationCode).charAt(2)}</span>
        <span class="digit">${String(verificationCode).charAt(3)}</span>
        <span class="digit">${String(verificationCode).charAt(4)}</span>
        <span class="digit">${String(verificationCode).charAt(5)}</span>
      </div>
      <p class="footer">For verification purposes only for the BazzarBee <br> Thank You</p>
    </div>
  </div>
</body>
</html>

  `,
  };

  try {
    await transporter.sendMail(mailSuperAdmin);
    console.log(`Verification code sent`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send verification code to email.");
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username && !email) {
      return res.status(400).json({ message: "Missing username or email" });
    }

    let user;
    user = await User.findOne({ username, email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ message: "Login successful!", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { username, email, password, verificationCode, phoneNumber } = req.body;
  try {
    if (!username || !email || !password || !verificationCode || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "username already in use" });
    }

    const existingUser1 = await User.findOne({ email });
    if (existingUser1) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const verification = await Verification.findOne({
      verificationCode,
      email,
    });
    if (!verification) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({ message: "Signup successful!", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    }

    const userId = decodedToken._id;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = {
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    };

    return res.status(200).json({ user: data });
  } catch (error) {
    console.error(error); // Log errors for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { insert, emailVerification, signup, login, getUserInfo };
