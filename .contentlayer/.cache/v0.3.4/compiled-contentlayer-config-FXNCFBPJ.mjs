// contentlayer.config.ts
import { defineDocumentType } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-remote-files";
import { writeFile } from "fs/promises";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
var env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SENDGRID_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().min(1)
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
    NEXT_PUBLIC_AWS_S3_REGION: z.string().min(1)
  },
  /**
   *  Specify your shared environment variables schema here.
   */
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"])
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
    NEXT_PUBLIC_AWS_S3_REGION: process.env.NEXT_PUBLIC_AWS_S3_REGION
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  isServer: typeof window === "undefined"
});

// src/lib/prisma.ts
var globalForPrisma = global;
var prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["query"]
});
if (env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

// contentlayer.config.ts
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    tags: {
      type: "list",
      of: {
        type: "enum",
        options: ["AI & Machine Learning", "Cybersecurity", "Software Development", "Tech Industry News", "Gadgets & Hardware", "Web Development", "Mobile Tech", "Emerging Tech", "Programming", "SEO", "AR & VR", "Album Reviews", "Artist Spotlights", "Music Industry News", "Music Theory", "Concerts & Live Shows", "Hip-Hop/Rap", "R&B", "Team Profiles", "Match Analysis", "Player Profiles", "Sports News", "Commentary & Opinions", "Training", "Game Reviews", "Gaming News", "Game Design", "eSports", "Game Guides", "Indie Games"]
      }
    },
    category: {
      type: "enum",
      options: ["General", "Tech", "Life", "Sports", "Music", "Games", "Movies", "Books", "Food", "Travel"],
      default: "General"
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`
    },
    slugAsParams: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath
    },
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`
    }
  }
}));
var syncContentFromDatabase = async (contentDir) => {
  let wasCancelled = false;
  let syncInterval;
  const syncRun = async () => {
    const posts = await prisma.post.findMany();
    for (const post of posts) {
      const filePath = `${contentDir}/${post.slug}.mdx`;
      await writeFile(filePath, post.content);
    }
  };
  const syncLoop = async () => {
    await syncRun();
    if (wasCancelled)
      return;
    syncInterval = setTimeout(syncLoop, 1e3 * 60);
  };
  await syncLoop();
  return () => {
    wasCancelled = true;
    clearTimeout(syncInterval);
  };
};
var contentlayer_config_default = makeSource({
  syncFiles: syncContentFromDatabase,
  contentDirPath: "posts",
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FXNCFBPJ.mjs.map
