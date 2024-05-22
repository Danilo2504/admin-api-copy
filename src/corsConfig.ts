const allowedOrigins: string[] = [
  "https://maui-admin.vercel.app",
  "https://maui-admin.netlify.app",
];

if (process.env?.DEV) allowedOrigins.push("http://localhost:3000");

export const cors_config = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
