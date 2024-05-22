import dotenv from "dotenv";
dotenv.config();
import Express, { NextFunction, Request, Response } from "express";
import { HttpException } from "./exceptions/http-exception";
import { cors_config } from "./corsConfig";
import cors from "cors";
import morgan from "morgan";
import Router from "./routes/v1/router";

const PORT = process.env.PORT ?? 5000;

const app = Express();
app.use(cors(cors_config));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(Router);

// Error handling, must be last
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error on", req.url);
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpException) {
    return res.status(err.getStatus()).json({
      error: err.getResponse(),
    });
  }

  // if sent a malformed request, return a 400
  if (err?.status == 400) {
    return res.status(400).send("Malformed body");
  }

  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
