import { z } from "zod";

const MAX_MB = 10;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" })
    .max(50),
  subject: z
    .string()
    .min(2, { message: "主題は2文字以上で入力してください" })
    .max(50),
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上で設定してください" })
    .max(160, { message: "本文は160文字以内で設定してください" }),
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "ファイル画像が必要です") // files?.length > 0
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE, // refineはバリデーション用のメソッド　falseならメッセージを返す
      `画像は${MAX_FILE_SIZE}MB以内で設定してください` // 画像サイズの指定
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "jpg,jpeg,png,gif,webp形式の画像を選択してください"
    ), // includesは配列内に指定した値が含まれているかをチェック
});
