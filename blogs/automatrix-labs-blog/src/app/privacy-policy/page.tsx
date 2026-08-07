import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — AutoMatrix Labs',
  description: 'How AutoMatrix Labs collects, uses, and protects your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-3">Legal</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0F172A]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#64748B] text-sm mt-3">Last updated: August 7, 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <p>
            AutoMatrix Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) publishes practical AI
            guides, tool reviews, and tutorials at automatrix-blog.vercel.app. This policy explains what
            information we collect when you visit the site, why we collect it, and the choices you have.
          </p>

          <h2>Information We Collect</h2>
          <p>We keep data collection minimal. Depending on how you use the site, we may collect:</p>
          <ul>
            <li>
              <strong>Email address</strong> — only if you voluntarily submit it through our newsletter
              signup or contact form. We do not require an account to read any article.
            </li>
            <li>
              <strong>Usage data</strong> — standard web server logs (pages visited, browser type,
              approximate location from IP, referring site) collected automatically by our hosting
              provider, Vercel, for security and performance purposes.
            </li>
          </ul>
          <p>We do not collect payment information, government IDs, or other sensitive personal data.</p>

          <h2>How We Use Information</h2>
          <ul>
            <li>To respond to messages sent through the contact form.</li>
            <li>To send occasional updates if you&apos;ve subscribed to our newsletter — you can unsubscribe at any time.</li>
            <li>To understand aggregate traffic patterns and improve the site.</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>Cookies</h2>
          <p>
            The site may use essential cookies required for basic functionality. If we add analytics or
            advertising cookies in the future, this policy will be updated accordingly and, where required
            by law, you&apos;ll be asked for consent.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Articles on this site may link to third-party tools and services, including affiliate links
            (see our <a href="/affiliate-disclosure">Affiliate Disclosure</a>). We are not responsible for
            the privacy practices of external sites — please review their own policies before sharing
            information with them.
          </p>

          <h2>Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of any personal data we hold about you
            (such as your email address on our newsletter list) by contacting us using the details below.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>This site is not directed at children under 13, and we do not knowingly collect information from them.</p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of
            this page reflects the most recent revision.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about this policy? Reach out via our <a href="/contact">Contact page</a> or email{' '}
            <a href="mailto:badreddinekx122@gmail.com">badreddinekx122@gmail.com</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
