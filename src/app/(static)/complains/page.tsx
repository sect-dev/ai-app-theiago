const ComplainsPage = () => {
  return (
    <div className="flex flex-col gap-[20px] p-[20px]">
      <h1 className="text-2xl font-bold">COMPLIANCE & CONTENT REMOVAL</h1>

      <p className="text-sm">Last updated: May 2025</p>

      <p>
        At AiGo, we are committed to operating in full compliance with
        international laws, payment provider guidelines, and community
        standards. This page outlines our approach to legal compliance, age
        restrictions, and procedures for content removal.
      </p>

      <h2 className="text-xl font-bold">LEGAL COMPLIANCE</h2>

      <h3 className="text-lg font-bold">Age Restriction</h3>
      <p>
        Our product is strictly intended for users aged 18 and older. We use
        technical measures such as age-gates, metadata flags, and content
        classification to restrict access to adult content.
      </p>

      <h3 className="text-lg font-bold">User Responsibility</h3>
      <p>
        Users are expected to use the platform responsibly. We reserve the right
        to suspend or terminate accounts found in violation of our policies.
      </p>

      <h2 className="text-xl font-bold">CONTENT GUIDELINES</h2>

      <p>
        We prohibit the generation or use of the following types of content:
      </p>

      <ul className="list-disc space-y-2 pl-6">
        <li>
          Depictions of minors or characters that resemble minors in a sexual
          context
        </li>
        <li>
          Realistic representations of celebrities, public figures, or private
          individuals
        </li>
        <li>Non-consensual or harmful behavior</li>
        <li>Promotion of hate speech, violence, or illegal activities</li>
      </ul>

      <p className="mt-4">
        All AI-generated characters and interactions are fictional, designed for
        entertainment and self-expression. We do not allow uploading of
        user-generated NSFW content.
      </p>

      <h2 className="text-xl font-bold">CONTENT REMOVAL REQUESTS</h2>

      <p>
        If you believe that any content on AiGo violates your rights or our
        guidelines, you can submit a removal request.
      </p>

      <p>We respond to:</p>

      <ul className="list-disc space-y-2 pl-6">
        <li>Copyright or likeness infringement claims</li>
        <li>Inappropriate or miscategorized characters</li>
        <li>Abusive or harmful user-generated content</li>
      </ul>

      <p className="mt-4">
        Please contact us at: <strong>support@theaigo.com</strong>
      </p>

      <p>
        Include a clear description of the content, the reason for removal, and
        any relevant evidence.
      </p>

      <h2 className="text-xl font-bold">MODERATION PRACTICES</h2>

      <p>We use a hybrid approach combining:</p>

      <ul className="list-disc space-y-2 pl-6">
        <li>
          AI-based real-time content filtering (based on OpenAI safety
          classifiers and custom blocklists)
        </li>
        <li>Human moderation for flagged or escalated content</li>
        <li>
          Proactive audits for compliance with payment provider and ad platform
          policies
        </li>
      </ul>

      <h2 className="text-xl font-bold">POLICY UPDATES</h2>

      <p>
        We reserve the right to update these policies to align with evolving
        regulations and platform requirements. All users will be notified of
        major changes via email or in-app notices.
      </p>
    </div>
  );
};

export default ComplainsPage;
