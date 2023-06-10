// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Post'
  title: string
  date: IsoDateTimeString
  description: string
  published: boolean
  tags?: ('AI & Machine Learning' | 'Cybersecurity' | 'Software Development' | 'Tech Industry News' | 'Gadgets & Hardware' | 'Web Development' | 'Mobile Tech' | 'Emerging Tech' | 'Programming' | 'SEO' | 'AR & VR' | 'Album Reviews' | 'Artist Spotlights' | 'Music Industry News' | 'Music Theory' | 'Concerts & Live Shows' | 'Hip-Hop/Rap' | 'R&B' | 'Team Profiles' | 'Match Analysis' | 'Player Profiles' | 'Sports News' | 'Commentary & Opinions' | 'Training' | 'Game Reviews' | 'Gaming News' | 'Game Design' | 'eSports' | 'Game Guides' | 'Indie Games')[] | undefined
  category: 'General' | 'Tech' | 'Life' | 'Sports' | 'Music' | 'Games' | 'Movies' | 'Books' | 'Food' | 'Travel'
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
  url: string
}  

/** Nested types */
  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Post
export type DocumentTypeNames = 'Post'

export type NestedTypes = never
export type NestedTypeNames = never

export type DataExports = {
  allDocuments: DocumentTypes[]
  allPosts: Post[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Post: Post
}

export type NestedTypeMap = {

}

 