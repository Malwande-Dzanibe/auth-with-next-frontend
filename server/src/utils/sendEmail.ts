// import nodemailer from "nodemailer";
import { Token, User } from "@prisma/client";
import nodemailerTransporter from "./nodemailerTransporter";

const sendEmails = (user: User, token: Token) => {
  nodemailerTransporter().sendMail(
    {
      from: `"Malwande Dzanibe" <malwandedza@outlook.com>`,
      to: user.email,
      subject: `Oppotunies are waiting for you`,
      text: `Your OTP is ${token.emailToken}, kindly note that this OTP expires in 10 minutes`,
      html: `<h1>Your OTP is ${token.emailToken}</h1> <p>kindly note that this OTP expires in 10 minutes</p>`,
    },
    (error, infor) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email was successfully sent");
      }
    }
  );
};

export default sendEmails;
