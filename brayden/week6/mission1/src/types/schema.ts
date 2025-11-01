import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }), // email의 형식이 잘못되었을 경우 에러메시지를 email({}) 안에 작성할 수 있다.

    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type FormFields = z.infer<typeof schema>;
