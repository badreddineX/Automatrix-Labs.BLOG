import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — AutoMatrix Labs',
  description: 'How AutoMatrix Labs uses affiliate links and how that affects our reviews.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-3">Legal</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0F172A]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Affiliate Disclosure
          </h1>
          <p className="text-[#64748B] text-sm mt-3">Last updated: August 7, 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p>
            In accordance with FTC guidelines on endorsements and testimonials, we want to be upfront
            about how AutoMatrix Labs makes money and how that relates to the content you read here.
          </p>

          <h2>We Use Affiliate Links</h2>
          <p>
            Some of the links in our articles — particularly in tool reviews, comparisons, and
            &ldquo;best of&rdquo; roundups — are affiliate links. If you click one of these links and go on
            to sign up for or purchase a product, we may earn a commission from the company. This comes at{' '}
            <strong>no extra cost to you</strong> — the price you pay is the same whether you use our link
            or go directly to the provider.
          </p>

          <h2>How This Affects (and Doesn&apos;t Affect) Our Content</h2>
          <p>
            We only recommend tools we believe are genuinely useful based on hands-on testing and research.
            Earning a commission never determines whether a tool gets a positive review, and it never
            changes our rating or opinion of a product. If a tool has real limitations, we say so — commission
            potential doesn&apos;t change that.
          </p>
          <p>
            Not every tool we cover has an affiliate relationship with us, and we sometimes recommend free
            or non-affiliate tools over paid, affiliate ones when we think they&apos;re the better fit.
          </p>

          <h2>Sponsored Content</h2>
          <p>
            If an article is sponsored or written in partnership with a company, we will clearly label it
            as such at the top of the post. As of this writing, all published articles are independently
            written and not sponsored.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about a specific link or partnership, email{' '}
            <a href="mailto:badreddinekx122@gmail.com">badreddinekx122@gmail.com</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
