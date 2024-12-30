import { EmailTemplate } from "@/components/ui/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  //   const { username, subject, email, content, file } = await request.json();
  const formData = await request.formData(); // 値を取り出す
  const username = formData.get("username") as string;
  const subject = formData.get("subject") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File;

  //   console.log(username, subject, email, content, file);

  const buffer = Buffer.from(await file.arrayBuffer()); // ファイルをバイナリに変換

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["qyouhui26@gmail.com"],
      subject: subject,
      react: EmailTemplate({
        username,
        email,
        content,
      }) as React.ReactElement,
      attachments: [{ filename: file.name, content: buffer }],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
