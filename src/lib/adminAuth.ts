import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "casa_admin_session";

const adminSessionPayload = "casa-la-sorpresa-admin:v1";

const getAdminSecret = () =>
  process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";

export const isAdminLoginConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export const createAdminSessionToken = () => {
  const secret = getAdminSecret();

  if (!secret) return "";

  return createHmac("sha256", secret).update(adminSessionPayload).digest("hex");
};

export const isValidAdminSession = (token?: string) => {
  const expected = createAdminSessionToken();

  if (!token || !expected || token.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
};
