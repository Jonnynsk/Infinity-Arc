import z from "zod";

export const LoginRequest = z.object({
  email: z.email(),
  password: z.string(),
});
export type TLoginRequest = z.infer<typeof LoginRequest>;

export const AuthResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type TAuthResponse = z.infer<typeof AuthResponse>;

export const RegisterRequest = z.object({
  name: z.string(),
  username: z.string(),
  country: z.string(),
  email: z.email(),
  password: z.string(),
});
export type TRegisterRequest = z.infer<typeof RegisterRequest>;

export const ChangePasswordRequest = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
export type TChangePasswordRequest = z.infer<typeof ChangePasswordRequest>;
