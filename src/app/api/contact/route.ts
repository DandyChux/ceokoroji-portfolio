import mail from '@sendgrid/mail';
import { NextResponse, type NextRequest } from "next/server";
import { type ContactFormInputs } from "~components/Forms/ContactForm";
import { env } from "~env/server.mjs";

mail.setApiKey(env.SENDGRID_API_KEY);

export async function POST(req: NextRequest) {
    const body: ContactFormInputs = await req.json();
    // const { name, email, message } = body;

    const msg = `
        Name: ${body.name}\r\n
        Email: ${body.email}\r\n
        Message: ${body.message}
    `;

    const data: mail.MailDataRequired = {
        to: 'ceo.okoroji@outlook.com',
        from: 'dandychux@gmail.com',
        subject: 'New Message from Contact Form',
        text: msg,
        html: msg.replace(/\r\n/g, '<br>')
    }

    await mail.send(data);

    return NextResponse.json({ message: 'Message sent successfully' })
}