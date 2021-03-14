export interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  sameSite?: "lax" | "none" | "strict" | undefined | boolean;
  secure?: boolean;
}
