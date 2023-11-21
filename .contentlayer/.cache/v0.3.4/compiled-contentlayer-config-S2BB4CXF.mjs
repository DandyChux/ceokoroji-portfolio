// contentlayer.config.ts
import { defineDocumentType } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-remote-files";
import { writeFile } from "fs/promises";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// src/env/schema.mjs
import { z } from "zod";
var serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url({ message: "Invalid url" }),
  SENDGRID_API_KEY: z.string()
});
var clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});
var clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// src/env/client.mjs
var _clientEnv = clientSchema.safeParse(clientEnv);
var formatErrors = (errors) => Object.entries(errors).map(([name, value]) => {
  if (value && "_errors" in value)
    return `${name}: ${value._errors.join(", ")}
`;
}).filter(Boolean);
if (!_clientEnv.success) {
  console.error(
    "\u274C Invalid environment variables:\n",
    ...formatErrors(_clientEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}
for (let key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith("NEXT_PUBLIC_")) {
    console.warn(
      `\u274C Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`
    );
    throw new Error("Invalid public environment variable name");
  }
}
var env = _clientEnv.data;

// src/env/server.mjs
var _serverEnv = serverSchema.safeParse(process.env);
if (!_serverEnv.success) {
  console.error(
    "\u274C Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}
for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("\u274C You are exposing a server-side env-variable:", key);
    throw new Error("You are exposing a server-side env-variable");
  }
}
var env2 = { ..._serverEnv.data, ...env };

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
var globalForPrisma = global;
var prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["query"]
});
if (env2.NODE_ENV !== "production")
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
//# sourceMappingURL=compiled-contentlayer-config-S2BB4CXF.mjs.map
