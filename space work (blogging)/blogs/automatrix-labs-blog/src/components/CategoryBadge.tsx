import type { Category } from '@/types/post'

const colors: Record<Category, string> = {
  news: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  tutorial: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  review: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  opinion: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  research: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
}

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${colors[category]}`}>
      {category}
    </span>
  )
}
