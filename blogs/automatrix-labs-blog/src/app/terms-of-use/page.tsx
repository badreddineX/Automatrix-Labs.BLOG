import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — AutoMatrix Labs',
  description: 'The terms that govern your use of the AutoMatrix Labs website.',
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-3">Legal</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0F172A]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Terms of Use
          </h1>
          <p className="text-[#64748B] text-sm mt-3">Last updated: August 7, 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p>
            Welcome to AutoMatrix Labs. By accessing or using this website, you agree to the terms below.
            If you don&apos;t agree, please don&apos;t use the site.
          </p>

          <h2>Content &amp; Intellectual Property</h2>
          <p>
            All articles, graphics, and original content on this site are the property of AutoMatrix Labs
            unless otherwise credited. You&apos;re welcome to link to our articles or quote short excerpts
            with attribution and a link back to the original post. Reproducing full articles elsewhere
            without permission is not allowed.
          </p>

          <h2>No Professional Advice</h2>
          <p>
            Content on this site — including AI tool reviews, tutorials, and comparisons — is for
            informational and educational purposes only. It does not constitute professional, legal,
            financial, or technical advice. AI tools, pricing, and features change quickly; always verify
            current details directly with the tool provider before making a purchasing decision.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            We do our best to keep articles accurate and up to date, but we make no guarantees about
            completeness or reliability. Tool pricing, features, and availability mentioned in our reviews
            can change after publication.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Some articles contain affiliate links. If you click one and make a purchase, we may earn a
            commission at no extra cost to you. See our <a href="/affiliate-disclosure">Affiliate Disclosure</a>{' '}
            for details. Affiliate relationships never influence our editorial opinions.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our articles link to external tools, products, and resources. We don&apos;t control and aren&apos;t
            responsible for the content, accuracy, or practices of third-party sites.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            AutoMatrix Labs is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable
            for any damages or losses resulting from your use of this site or reliance on its content,
            including decisions made based on tool reviews or comparisons.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms periodically. Continued use of the site after changes means you
            accept the revised terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about these terms? Email{' '}
            <a href="mailto:badreddinekx122@gmail.com">badreddinekx122@gmail.com</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
