import { Request, Response } from "express";
import { sendEmail } from "../services/contactEmailService";

export const sendContactMessage = async (req: Request, res: Response) => {
    try{
        const {name, email, message} = req.body;

        if(!name || !email || !message){
            return res.status(400).json({ error: "Por favor, preencha todos os campos." });
        }

        await sendEmail(name, email, message);

        return res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    } catch (e) {
        // console.error("Erro no controller ao enviar a messagem:", e);
        return res.status(500).json({ error: "Não foi possivel enviar a mensagem no momento." });
    }
};