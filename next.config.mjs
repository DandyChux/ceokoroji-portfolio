// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));
import { withContentlayer } from "next-contentlayer";
// import "./src/env.mjs";

/** @type {import("next").NextConfig} */
export default withContentlayer({
	reactStrictMode: true,
	swcMinify: true
});
