export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  email: string;
  newPassword: string;
}

export class VerifyOtpDto {
  email: string;
  otp: string;
}
