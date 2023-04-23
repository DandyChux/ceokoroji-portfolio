export type Author = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export type Post = {
    id: number;
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
}

export type Tag = {
    id: number;
    name: string;
}

export type Comment = {
    id: number;
    content: string;
    createdAt: Date;
    postId: number;
    authorId: number;
}