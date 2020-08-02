export const axios_defaults_baseURL =
  process.env.NODE_ENV === "production"
    ? "http://35.224.166.89"
    : "http://127.0.0.1:8000";