export type Category = 'news' | 'tutorial' | 'review' | 'opinion' | 'research'

export interface PostAuthor {
  name: string
  avatar: string
}

export interface Post {
  slug: string
  title: string
  date: string
  category: Category
  tags: string[]
  excerpt: string
  coverImage: string
  author: PostAuthor
  readingTime: string
  content: string
}

export type PostMeta = Omit<Post, 'content'>
