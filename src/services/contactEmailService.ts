import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const userEmail = process.env.EMAIL_USER;
const passwordEmail = process.env.EMAIL_PASSWORD;
const toEmail = process.env.EMAIL_TO;

console.log("Lendo do ENV -> Email:", userEmail, "| Senha:", passwordEmail);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userEmail,
    pass: passwordEmail
  }
});

export const sendEmail = async (name: string, email: string, message: string) =>{

    const mailInfo = {
        from: userEmail,
        to: toEmail,
        replyTo: email,
        subject: `${name} contactou pelo site`,
        text: `Você recebeu uma nova mensagem!\n\nNome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    }

    try{
        await transporter.sendMail(mailInfo);

        console.log("Email enviado com sucesso!");
    } catch(e){
        console.error("Erro ao enviar o email:", e);
        throw new Error("Falha ao enviar o email. Tente novamente mais tarde.");
    }
};