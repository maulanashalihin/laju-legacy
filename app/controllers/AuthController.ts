
import Redis from "../services/Redis";
import Database from "../services/DB"
import Authenticate from "../services/Authenticate";
import { redirectParamsURL } from "../services/GoogleAuth";
import axios from "axios"
import { generateUUID } from "../services/helper";
import dayjs from "dayjs"
import Mailer from "../services/Mailer";
import e from "express";

class AuthController {

  public async registerPage(request, response) {

    if (request.cookies.auth_id) {
      return response.redirect("/auth/home")
    }


    return response.inertia("auth/register")
  }

  public async homePage(request, response) {
    return response.inertia("home")
  }

  public async profilePage(request, response) {

    return response.inertia("profile")


  }

  public async changeProfile(request, response) {
    const data = await request.json();

    await Database.from("users").where("id", request.user.id).update({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone
    })

    return response.json({ message: "Your profile has been updated" })


  }

  public async changePassword(request, response) {

    const data = await request.json();



    const user = await Database.from("users").where("id", request.user.id).first();



    const password_match = await Authenticate.compare(data.current_password, user.password);

    if (password_match) {
      await Database.from("users").where("id", request.user.id).update({
        password: await Authenticate.hash(data.new_password)
      })
    } else {
      return response.status(400).json({ message: "Password lama tidak cocok" })
    }



  }

  public async forgotPasswordPage(request, response) {



    return response.inertia("auth/forgot-password")
  }
  public async resetPasswordPage(request, response) {

    const id = request.params.id;

    const user_id = await Redis.get("reset-password:" + id);

    if (!user_id) {
      return response.status(404).send("Link tidak valid")
    }

    return response.inertia("auth/reset-password", { id: request.params.id })
  }

  public async resetPassword(request, response) {

    const { id, password } = await request.json();

    const user_id = await Redis.get("reset-password:" + id);

    if (!user_id) {
      return response.status(404).send("Link tidak valid")
    }


    await Database.from("users").where("id", user_id).update({ password: await Authenticate.hash(password) });

    const user = await Database.from("users").where("id", user_id).first();


    return Authenticate.process(user, request, response);
  }
  public async sendResetPassword(request, response) {


    let { email, phone } = await request.json()
 

    console.log(phone)
    let user;

    if (email && email.includes("@")) {
      user = await Database.from("users").where("email", email).first();
    } else if (phone) {
      user = await Database.from("users").where("phone", phone).first();
    }




    if (!user) {
      return response.status(404).send("Email tidak terdaftar")
    }

    const id = generateUUID();


    try {
      await Mailer.sendMail({
        from: '"Dripsender Auth" <dripsender.id@gmail.com>',
        to: email,
        subject: "Reset Password",
        text: `Anda telah melakukan reset password. Jika itu benar, silakan Klik link berikut : 
      
        ${process.env.APP_URL}/reset-password/${id}
        
        Jika anda tidak merasa melakukan reset password, abaikan email ini.
              `
      });




    } catch (error) {


    }


    try {
      if (user.phone)
        await axios.post("https://api.dripsender.id/send", {
          "api_key": "ee042c8b-f5e1-4366-abc1-ee771d209384", "phone": user.phone,
          text: `Anda telah melakukan reset password. Jika itu benar, silakan Klik link berikut : 
      
${process.env.APP_URL}/reset-password/${id}
          
Jika anda tidak merasa melakukan reset password, abaikan pesan  ini.
                `})

    } catch (error) {

    }

    await Redis.setEx("reset-password:" + id, 60 * 60 * 24, user.id);


    return response.send("OK")
  }




  public async loginPage(request, response) {

 

    return response.inertia("auth/login")
  }



  public async redirect(request, response) {

    const params = redirectParamsURL();

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

    return response.redirect(googleLoginUrl);

  }

  public async googleCallback(request, response) {

    const { code } = request.query;


    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
      },
    });

    const result = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    let { email, name, verified_email } = result.data;

    email = email.toLowerCase();

    const check = await Database.from("users").where("email", email).first();

    if (check) {
      // 
      return Authenticate.process(check, request, response);
    } else {
      const user = {
        id: generateUUID(),
        email: email,
        password: await Authenticate.hash(email),
        name: name,
        is_verified: verified_email,
        created_at: dayjs().valueOf(),
        updated_at: dayjs().valueOf()
      }

      await Database.table("users").insert(user);

      return Authenticate.process(user, request, response);;
    }


    response.send("google callback")

  }



  public async processLogin(request, response) {

    let body = await request.json();

    let { email, password, phone } = body;
 

    let user;

    if (email && email.includes("@")) {
      user = await Database.from("users").where("email", email).first();
    } else if (phone) {
      user = await Database.from("users").where("phone", phone).first();
    }




    if (user) {
      const password_match = await Authenticate.compare(password, user.password);

      if (password_match) {
        return Authenticate.process(user, request, response);
      }
      else {
        return response.cookie("error", "Maaf, Password salah").redirect("/login")
      }
    } else {
      return response.cookie("error", "Email/No.HP tidak terdaftar").redirect("/login")
    }

  }

  public async processRegister(request, response) {


    let { email, password, name } = await request.json();


    email = email.toLowerCase();

    try {

      const user = {
        email: email,
        id: generateUUID(),
        name,
        password: await Authenticate.hash(password)
      };

      const id = await Database.table("users").insert(user)



      return Authenticate.process(user, request, response);

    } catch (error) {

      console.log(error)
      return response.cookie("error", "Maaf, Email sudah terdaftar").redirect("/register")
    }






  }



  public async show(request, response) {

  }

  public async edit(request, response) {
  }

  public async verify(request, response) {


    const id = generateUUID();

    try {



      await Mailer.sendMail({
        from: '"Dripsender Auth" <dripsender.id@gmail.com>',
        to: request.user.email,
        subject: "Verifikasi Akun",
        text: "Klik link berikut untuk verifikasi email anda : " + process.env.APP_URL + "/auth/verify/" + id
      });

    } catch (error) {

      console.log(error)

      return response.redirect("/auth/home");
    }

    await Redis.setEx("verifikasi-user:" + request.user.id, 60 * 60 * 24, id);

    return response.redirect("/auth/home");
  }

  public async verifyPage(request, response) {


    const { id } = request.params;

    const verifikasi = await Redis.get("verifikasi-user:" + request.user.id);

    if (verifikasi == id) {

      await Database.from("users").where("id", request.user.id).update({ is_verified: true });

    }

    return response.redirect("/auth/home?verified=true");
  }


  public async logout(request, response) {

    if (request.cookies.auth_id) {
      await Authenticate.logout(request, response);

    }



  }
}


export default new AuthController();

