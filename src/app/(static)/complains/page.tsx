const ComplainsPage = () => {
	return (
		<div className="flex flex-col gap-[20px] p-[20px]">
			{/* ИЗМЕНЕНО: Новый заголовок и дата */}
			<h1 className="text-2xl font-bold">COMPLIANCE & CONTENT REMOVAL</h1>
			<p className="text-sm">Last updated: July 2025</p>

			{/* ИЗМЕНЕНО: Новый вводный абзац */}
			<p>
				At AiGo, operated by New Verve Limited, we are committed to maintaining
				full compliance with applicable laws, payment provider requirements, and
				community standards. This page explains how we handle legal compliance,
				content restrictions, and removal requests.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел LEGAL COMPLIANCE */}
			<h2 className="text-xl font-bold">LEGAL COMPLIANCE</h2>
			<h3 className="text-lg font-bold">Company Information</h3>
			<p>
				AiGo is operated by New Verve Limited, duly incorporated in the United
				Kingdom, with its registered address at:
				<br />
				86–90 Paul Street, London, England, EC2A 4NE.
			</p>
			<h3 className="text-lg font-bold">Age Restrictions</h3>
			<p>
				Our services are intended strictly for users aged 18 years and older. We
				enforce this through age-gates, metadata controls, and, where required
				by law, additional verification procedures.
			</p>
			<h3 className="text-lg font-bold">User Responsibilities</h3>
			<p>
				Users must use AiGo in compliance with our Terms of Service (
				<a href="https://web.theaigo.com/terms" target="_blank">
					https://web.theaigo.com/terms
				</a>
				) and applicable laws. Accounts engaged in prohibited activities may be
				suspended or terminated.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел CONTENT GUIDELINES */}
			<h2 className="text-xl font-bold">CONTENT GUIDELINES</h2>
			<p>We prohibit any content that involves:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>
					Depictions of minors or characters resembling minors in sexual
					contexts
				</li>
				<li>
					Realistic sexual representations of celebrities, public figures, or
					private individuals
				</li>
				<li>Non-consensual, abusive, or otherwise harmful interactions</li>
				<li>Promotion of hate speech, violence, or illegal activities</li>
			</ul>
			<p className="mt-4">
				<strong>Note:</strong> All AI-generated characters and interactions on
				AiGo are fictional and designed for entertainment and self-expression.
				Uploading NSFW user-generated content is not allowed.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел CONTENT REMOVAL REQUESTS */}
			<h2 className="text-xl font-bold">CONTENT REMOVAL REQUESTS</h2>
			<p>
				If you believe that content on AiGo violates your rights or our
				policies, you may request its removal.
			</p>
			<p>How to submit a request:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>
					Email us at <strong>support@theaigo.com</strong>
				</li>
				<li>
					Provide:
					<ul className="list-disc pl-6">
						<li>A clear description or link to the content</li>
						<li>
							Reason for removal (e.g., copyright, likeness, policy violation)
						</li>
						<li>Any supporting evidence</li>
					</ul>
				</li>
			</ul>
			<p>
				We review all requests promptly and may request additional information
				if necessary. Users can appeal removal decisions by responding to our
				email.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел MODERATION PRACTICES */}
			<h2 className="text-xl font-bold">MODERATION PRACTICES</h2>
			<p>Our moderation combines:</p>
			<ul className="list-disc space-y-2 pl-6">
				<li>
					AI-powered filtering (real-time classifiers and custom blocklists)
				</li>
				<li>Human review for flagged or escalated content</li>
				<li>
					Proactive audits to ensure compliance with regulations and partner
					requirements
				</li>
			</ul>
			<p>
				All moderation activities are conducted with strict respect for user
				privacy.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел GOVERNING LAW & GLOBAL AVAILABILITY */}
			<h2 className="text-xl font-bold">GOVERNING LAW & GLOBAL AVAILABILITY</h2>
			<p>
				These policies are governed by the laws of England and Wales. By using
				AiGo, you agree that any disputes will be resolved exclusively in the
				courts of London, United Kingdom.
			</p>
			<p>
				AiGo complies with UK regulations and applicable international
				standards. However, service availability may be limited or suspended in
				jurisdictions where local laws or regulations prevent us from operating.
			</p>

			{/* ИЗМЕНЕНО: Новый раздел POLICY UPDATES */}
			<h2 className="text-xl font-bold">POLICY UPDATES</h2>
			<p>
				We may update these policies to reflect regulatory changes or platform
				improvements. Users will be notified of significant updates via email or
				in-app notices.
			</p>
		</div>
	);
};

export default ComplainsPage;
