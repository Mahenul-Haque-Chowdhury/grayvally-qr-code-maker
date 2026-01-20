import { IconInfo, IconCheckCircle } from '@/components/Icons';

const LAST_UPDATED = 'January 20, 2026';

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <section className="card-glow px-4 py-6 sm:px-6 sm:py-8">
        <div className="section-header">
          <div className="section-icon bg-gradient-to-br from-slate-600 to-slate-800 text-white">
            <IconInfo className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Terms of Use</h1>
            <p className="text-sm text-slate-500">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-slate-700">
          <p>
            These Terms of Use ("Terms") govern your access to and use of the QR Code Maker website and services
            (the "Service"). By using the Service you agree to these Terms. If you do not agree, do not use the Service.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">1. Using the Service</h2>
          <p>
            The Service lets you generate, preview, and download QR codes. You are responsible for how you use generated
            codes and for verifying that the codes function as intended in your environment.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">2. Eligibility</h2>
          <p>
            You must be at least 13 years old (or the minimum legal age in your jurisdiction) to use the Service. If you are
            using the Service on behalf of an organization, you represent and warrant that you have authority to bind that
            organization to these Terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">3. Prohibited Uses</h2>
          <p>
            You agree not to use the Service to generate, upload, or distribute content that: is illegal, fraudulent,
            defamatory, infringing, obscene, harassing, pornographic, promotes violence, or otherwise violates applicable
            laws or third-party rights. You must not use the Service to create QR codes that facilitate deceptive or harmful
            activities.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">4. Intellectual Property</h2>
          <p>
            All content and code provided by the Service (excluding user-provided content) are the property of the Service
            provider and are protected by copyright, trademark, and other laws. You may use generated QR codes for your
            personal or business purposes in accordance with these Terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">5. User Content & License</h2>
          <p>
            When you provide content to be encoded (links, text, images), you retain any rights you have in that content.
            By submitting content, you grant the Service a worldwide, non-exclusive, royalty-free license to use and
            process that content to provide the Service, improve it, and comply with legal obligations.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">6. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. THE OWNER MAKES NO
            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE SERVICE DOES NOT GUARANTEE THAT GENERATED QR CODES WILL PERFORM
            CORRECTLY IN ALL READERS OR ENVIRONMENTS.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">7. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE OWNER OR ITS AFFILIATES BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF
            THE SERVICE. THE OWNER'S TOTAL LIABILITY FOR CLAIMS ARISING FROM THE SERVICE IS LIMITED TO THE AMOUNT YOU PAID,
            IF ANY, IN THE PRIOR 12 MONTHS.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless the owner and its officers, directors, employees, and agents from any
            claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising from your use
            of the Service or violation of these Terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">9. Termination</h2>
          <p>
            The owner may suspend or terminate your access to the Service at any time for violations of these Terms, or for
            any other lawful reason, without prior notice. Sections that by their nature should survive termination (such as
            Intellectual Property, Disclaimers, Limitation of Liability, and Indemnification) will survive.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">10. Changes</h2>
          <p>
            We may modify these Terms from time to time. When we do, we will revise the "Last updated" date. Continued use
            of the Service after changes indicates your acceptance of the updated Terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the jurisdiction where the Service owner
            is located, without regard to conflict of laws principles. You agree to submit to the exclusive jurisdiction of
            the courts located in that jurisdiction for disputes arising out of or related to these Terms.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">12. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at: support@example.com. Replace this address with
            your preferred contact email.
          </p>

          <p className="text-sm text-slate-500">This document is not legal advice. Consider consulting a lawyer for legal questions.</p>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-brand-50 border border-brand-200/50 px-4 py-3">
            <IconCheckCircle className="h-5 w-5 text-brand-600" />
            <p className="text-sm text-brand-700 font-medium">By using this Service, you agree to these Terms.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
