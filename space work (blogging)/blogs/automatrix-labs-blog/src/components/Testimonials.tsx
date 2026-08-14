const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'ML Engineer @ Stripe',
    avatar: 'https://picsum.photos/seed/rev1/40/40',
    rating: 5,
    text: 'AutoMatrix Labs is my go-to for staying current. The tutorials are hands-on and actually work — rare in this space.',
  },
  {
    name: 'James Okafor',
    role: 'Indie AI Builder',
    avatar: 'https://picsum.photos/seed/rev2/40/40',
    rating: 5,
    text: 'Clear, opinionated, no fluff. Every article I read here saves me hours of research. Subscribed since day one.',
  },
  {
    name: 'Priya Nair',
    role: 'Product Manager @ Anthropic',
    avatar: 'https://picsum.photos/seed/rev3/40/40',
    rating: 5,
    text: 'The research breakdowns are exceptional. Complex papers explained in a way that actually builds intuition.',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Full-stack Dev & AI Enthusiast',
    avatar: 'https://picsum.photos/seed/rev4/40/40',
    rating: 5,
    text: 'Best AI blog I\'ve come across. The tool reviews are honest and the tutorials are production-ready.',
  },
  {
    name: 'Amira Hassan',
    role: 'Data Scientist @ Meta',
    avatar: 'https://picsum.photos/seed/rev5/40/40',
    rating: 5,
    text: 'I forward AutoMatrix Labs articles to my entire team. The writing quality and technical depth are unmatched.',
  },
  {
    name: 'Tom Eriksson',
    role: 'CTO @ AI Startup',
    avatar: 'https://picsum.photos/seed/rev6/40/40',
    rating: 5,
    text: 'This is what tech journalism should look like. No hype, just signal. Essential reading for anyone building with AI.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4" fill="#00E5FF" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="mt-16 pb-8">
      <div className="text-center mb-10">
        <p className="font-mono text-sm tracking-[0.2em] uppercase mb-3 font-semibold" style={{ color: '#00E5FF' }}>
          ✦ reader reviews
        </p>
        <h2 className="text-3xl font-bold text-foreground">What Our Readers Say</h2>
        <p className="text-muted-foreground text-sm mt-2">Trusted by builders, researchers, and creators worldwide.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="rounded-xl p-5 border border-border flex flex-col gap-3"
            style={{ backgroundColor: 'hsl(var(--muted))' }}
          >
            <Stars count={r.rating} />
            <p className="text-sm text-foreground leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border">
              <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
