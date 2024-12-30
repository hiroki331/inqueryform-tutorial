import { formSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const useMailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      subject: "",
      email: "",
      content: "",
      file: undefined,
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const { username, email, content, subject, file } = values;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("content", content);
    formData.append("subject", subject);

    if (file) {
      formData.append("file", file[0]); // file は FileList または undefined
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return { form, onSubmit };
};

export default useMailForm;
