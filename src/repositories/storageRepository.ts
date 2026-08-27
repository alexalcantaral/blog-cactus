import { Client } from "basic-ftp";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

const FTP_HOST = process.env.FTP_HOST!;
const FTP_PORT = Number(process.env.FTP_PORT || 21);
const FTP_USER = process.env.FTP_USER!;
const FTP_PASSWORD = process.env.FTP_PASSWORD!;
const FTP_SECURE = process.env.FTP_SECURE === "true";
const FTP_REMOTE_DIR = process.env.FTP_REMOTE_DIR || "/";
const IMAGES_BASE_URL = process.env.IMAGES_BASE_URL!;

const withFtpClient = async <T>(fn: (client: Client) => Promise<T>): Promise<T> => {
  const client = new Client();

  try {
    await client.access({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASSWORD,
      secure: FTP_SECURE,
    });

    await client.ensureDir(FTP_REMOTE_DIR);

    return await fn(client);
  } finally {
    client.close();
  }
};

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${Date.now()}-${file.originalname}`;

  await withFtpClient((client) => client.uploadFrom(Readable.from(file.buffer), fileName));

  return `${IMAGES_BASE_URL}/${fileName}`;
};

export const removeImage = async (fileName: string): Promise<void> => {
  await withFtpClient((client) => client.remove(fileName));
};
