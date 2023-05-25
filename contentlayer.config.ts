import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

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
                type: 'string',
            }
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

export default makeSource({
    contentDirPath: 'posts',
    documentTypes: [Post],
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