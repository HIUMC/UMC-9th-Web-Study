import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("유효하지 않은 이메일 형식입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  passwordCheck: z.string(),
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  profileImage: z
    .any()
    .refine((files) => files?.length === 1, "프로필 이미지를 업로드해주세요."),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

// Zod 타입 추출
export type SignUpFormValues = z.infer<typeof signUpSchema>;
