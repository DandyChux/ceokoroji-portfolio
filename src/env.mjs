import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SENDGRID_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_AWS_S3_ACCESS_KEY: z.string().min(1),
    NEXT_PUBLIC_AWS_S3_BUCKET: z.string().min(1),
    NEXT_PUBLIC_AWS_S3_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_AWS_S3_REGION: z.string().min(1),
  },

  /**
   *  Specify your shared environment variables schema here.
   */
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },

  /**
   * You can't destruct `process.env` as a regular object in client-side so we need to destruct manually.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AWS_S3_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
    NEXT_PUBLIC_AWS_S3_SECRET_KEY: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY,
    NEXT_PUBLIC_AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    NEXT_PUBLIC_AWS_S3_REGION: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  isServer: typeof window === "undefined",
})