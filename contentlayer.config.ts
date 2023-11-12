import { defineDocumentType } from 'contentlayer/source-files'
import { makeSource } from 'contentlayer/source-remote-files'
import { writeFile } from 'fs/promises'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { prisma } from './src/utils/prisma'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        published: {
            type: 'boolean',
            default: true,
        },
        tags: {
            type: 'list',
            of: {
                type: 'enum',
                options: ['AI & Machine Learning', 'Cybersecurity', 'Software Development', 'Tech Industry News', 'Gadgets & Hardware', 'Web Development', 'Mobile Tech', 'Emerging Tech', 'Programming', 'SEO', 'AR & VR', 'Album Reviews', 'Artist Spotlights', 'Music Industry News', 'Music Theory', 'Concerts & Live Shows', 'Hip-Hop/Rap', 'R&B', 'Team Profiles', 'Match Analysis', 'Player Profiles', 'Sports News', 'Commentary & Opinions', 'Training', 'Game Reviews', 'Gaming News', 'Game Design', 'eSports', 'Game Guides', 'Indie Games']
            },
        },
        category: {
            type: 'enum',
            options: ['General', 'Tech', 'Life', 'Sports', 'Music', 'Games', 'Movies', 'Books', 'Food', 'Travel'],
            default: 'General',
        }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (post) => `/${post._raw.flattenedPath}`,
        },
        slugAsParams: {
            type: 'string',
            resolve: (post) => post._raw.flattenedPath,
        },
        url: {
            type: 'string',
            resolve: (post) => `/blog/${post._raw.flattenedPath}`
        }
    },
}))

const syncContentFromDatabase = async (contentDir: string) => {
    let wasCancelled = false;
    let syncInterval: string | number | NodeJS.Timeout | undefined

    const syncRun = async () => {
        const posts = await prisma.post.findMany()

        for (const post of posts) {
            const filePath = `${contentDir}/${post.slug}.mdx`
            await writeFile(filePath, post.content)
        }
    }

    const syncLoop = async () => {
        await syncRun()

        if (wasCancelled) return

        syncInterval = setTimeout(syncLoop, 1000 * 60)
    }

    // Block until the first loop is done
    await syncLoop()

    return () => {
        wasCancelled = true
        clearTimeout(syncInterval)
    }
}

export default makeSource({
    syncFiles: syncContentFromDatabase,
    contentDirPath: 'posts',
    documentTypes: [Post],
    disableImportAliasWarning: true,
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    onVisitLine(node: any) {
                        // Prevent lines from collasping in `display: grid` mode, and allow empty lines to be copied
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node: any) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node: any) {
                        node.properties.className = ['word--highlighted']
                    }
                }
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    }
                }
            ]
        ]
    }
})