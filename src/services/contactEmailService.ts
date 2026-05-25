import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.EMAIL_TO!;

export const sendEmail = async (name: string, email: string, message: string) => {
    try {
        await resend.emails.send({
            from: "botcactus@resend.dev",
            to: toEmail,
            replyTo: email,
            subject: `${name} contactou pelo site`,
            text: `Você recebeu uma nova mensagem!\n\nNome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
        });
    } 
    catch(e){
        throw new Error("Falha ao enviar o email. Tente novamente mais tarde.");
    }
};