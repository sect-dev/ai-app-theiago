const Page = () => {
	return (
		<div className="flex flex-col gap-[20px] p-[20px]">
			<h1 className="mb-2 text-2xl font-bold">DMCA Policy</h1>
			<p className="mb-4 text-sm">Effective Date: 30 July 2025</p>

			<p>
				New Verve Limited ("we", "our", "us") respects the intellectual property
				rights of others and expects users of theaigo.com and its Services to do
				the same. This Digital Millennium Copyright Act (“DMCA”) Policy explains
				how copyright owners can submit infringement notices to us and how we
				respond.
			</p>

			<h2 className="mb-2 mt-4 text-xl font-bold">
				1. Reporting Copyright Infringement
			</h2>
			<p>
				If you believe that material available on our Services infringes your
				copyright, you may send a written notice of infringement to our
				designated DMCA Agent. Your DMCA notice must include the following
				information (as required by 17 U.S.C. §512(c)(3)):
			</p>
			<ul className="mb-2 list-disc pl-6">
				<li>
					A physical or electronic signature of the copyright owner or a person
					authorized to act on their behalf.
				</li>
				<li>
					Identification of the copyrighted work claimed to have been infringed.
				</li>
				<li>
					Identification of the material that is claimed to be infringing, with
					enough information for us to locate it.
				</li>
				<li>
					Contact information (address, phone number, and email) of the
					complaining party.
				</li>
				<li>
					A statement that the complaining party has a good faith belief that
					the use of the material is not authorized by the copyright owner, its
					agent, or the law.
				</li>
				<li>
					A statement that the information in the notice is accurate and, under
					penalty of perjury, that the complaining party is authorized to act on
					behalf of the copyright owner.
				</li>
			</ul>
			<p>
				Send notices to:
				<br />
				<strong>DMCA Agent</strong>
				<br />
				New Verve Limited
				<br />
				86–90 Paul Street
				<br />
				London, England, EC2A 4NE
				<br />
				Email: contact@newverve.co
			</p>

			<h2 className="mb-2 mt-4 text-xl font-bold">2. Response to Notices</h2>
			<p>Upon receipt of a valid DMCA notice:</p>
			<ul className="mb-2 list-disc pl-6">
				<li>
					We will promptly investigate and may remove or disable access to the
					allegedly infringing material.
				</li>
				<li>
					We will notify the user who uploaded the content of the removal.
				</li>
				<li>We may terminate accounts of repeat infringers.</li>
			</ul>

			<h2 className="mb-2 mt-4 text-xl font-bold">3. Counter-Notification</h2>
			<p>
				If you believe that material removed or disabled by mistake or
				misidentification is not infringing, you may submit a
				counter-notification to our DMCA Agent. Your counter-notice must
				include:
			</p>
			<ul className="mb-2 list-disc pl-6">
				<li>Your physical or electronic signature.</li>
				<li>
					Identification of the material that has been removed and its location
					before removal.
				</li>
				<li>
					A statement under penalty of perjury that you have a good faith belief
					the material was removed as a result of mistake or misidentification.
				</li>
				<li>Your name, address, telephone number, and email address.</li>
				<li>
					A statement that you consent to the jurisdiction of the courts in
					London, United Kingdom, and that you will accept service of process
					from the person who provided the original notice.
				</li>
			</ul>
			<p>
				If we receive a valid counter-notification, we may restore the material
				unless the original complainant files a court action within ten (10)
				business days.
			</p>

			<h2 className="mb-2 mt-4 text-xl font-bold">
				4. Repeat Infringer Policy
			</h2>
			<p>
				In accordance with the DMCA and other applicable laws, New Verve Limited
				has adopted a policy to terminate, in appropriate circumstances, users
				who are deemed to be repeat infringers.
			</p>

			<h2 className="mb-2 mt-4 text-xl font-bold">
				5. Misrepresentation Warning
			</h2>
			<p>
				Any person who knowingly misrepresents that material or activity is
				infringing may be liable for damages under Section 512(f) of the DMCA.
			</p>

			<h2 className="mb-2 mt-4 text-xl font-bold">6. Reservation of Rights</h2>
			<p>
				We reserve the right to remove content at our discretion, even if it
				does not constitute copyright infringement, and to take further action
				where appropriate. This DMCA Policy applies to all Services operated by
				New Verve Limited.
			</p>
		</div>
	);
};

export default Page;
