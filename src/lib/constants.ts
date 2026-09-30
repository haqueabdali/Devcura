/**
 * Runtime-agnostic constants.
 * Kept free of Node built-ins so the Edge middleware can import them.
 */
export const SESSION_COOKIE = "nb_admin_session";
export const CSRF_COOKIE = "nb_csrf";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
