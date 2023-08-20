const nodemailer = require("nodemailer");
const instace = {};


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'dripsender.id@gmail.com',
    pass: 'fhnfwfwnsqxmfmlw'
  }
});

transporter.config = ({ user, pass }) => {

  if(instace[user])
  {
    return instace[user];
  }else{
    instace[user] = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: user,
        pass: pass
      }
    });
  }

  return instace[user];

}

export default transporter;