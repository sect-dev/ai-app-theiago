const Page = () => {
	return (
		<>
			<div className="bg-gray-50 min-h-screen">
				<div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 sm:px-6">
					<div className="overflow-hidden rounded-lg shadow-lg">
						<div className="px-6 py-8 sm:px-8 sm:py-10">
							{/* Header */}
							<div className="mb-8">
								<h1 className="text-gray-900 mb-4 text-3xl font-bold">
									Privacy Policy
								</h1>
								<div className="text-gray-600 mb-4 flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between">
									<p className="mb-2 sm:mb-0">
										<span className="font-medium">Effective date:</span>{" "}
										2025-07-24
									</p>
									<p>
										<span className="font-medium">Updated on:</span> 2025-07-25
									</p>
								</div>
								<div className="from-blue-500 h-1 rounded-full bg-gradient-to-r to-purple-600"></div>
							</div>

							{/* Content */}
							<div className="prose prose-gray max-w-none">
								<p className="text-gray-700 mb-6 leading-relaxed">
									This Privacy Policy explains the policies of New Verve Limited
									on the collection and use of the information we collect when
									you access{" "}
									<a
										href="https://web.theaigo.com"
										className="text-blue-600 hover:text-blue-800 underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										https://web.theaigo.com
									</a>{" "}
									(the Service). This Privacy Policy describes your privacy
									rights and how you are protected under privacy laws.
								</p>

								<p className="text-gray-700 mb-6 leading-relaxed">
									By using our Service, you are consenting to the collection and
									use of your information in accordance with this Privacy
									Policy. Please do not access or use our Service if you do not
									consent to the collection and use of your information as
									outlined in this Privacy Policy. This Privacy Policy has been
									created with the help of{" "}
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://cookie-script.com/privacy-policy-generator"
										className="text-blue-600 hover:text-blue-800 underline"
									>
										CookieScript Privacy Policy Generator
									</a>
									.
								</p>

								<div className="bg-blue-50 border-blue-400 mb-6 border-l-4 p-4">
									<p className="text-blue-800">
										New Verve Limited is authorized to modify this Privacy
										Policy at any time. This may occur without prior notice.
									</p>
									<p className="text-blue-800 mt-2">
										New Verve Limited will post the revised Privacy Policy on
										the{" "}
										<a
											href="https://web.theaigo.com"
											className="font-medium underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											https://web.theaigo.com
										</a>{" "}
										website
									</p>
								</div>

								{/* Collection and Use Section */}
								<section className="mb-8">
									<h3 className="text-gray-900 border-gray-200 mb-4 border-b pb-2 text-2xl font-semibold">
										Collection and Use of Your Personal Information
									</h3>

									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										Information We Collect
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										When using our Service, you will be prompted to provide us
										with personal information used to contact or identify you.
										https://web.theaigo.com collects the following information:
									</p>

									<ul className="bg-gray-50 mb-6 rounded-lg p-4">
										<li className="text-gray-700 mb-2 flex items-center">
											<span className="bg-blue-500 mr-3 h-2 w-2 rounded-full"></span>
											Usage Data
										</li>
									</ul>

									<p className="text-gray-700 mb-3 leading-relaxed">
										Usage Data includes the following:
									</p>
									<ul className="mb-6 space-y-2">
										{[
											"Internet Protocol (IP) address of computers accessing the site",
											"Web page requests",
											"Referring web pages",
											"Browser used to access site",
											"Time and date of access"
										].map((item, index) => (
											<li
												key={index}
												className="text-gray-700 flex items-start"
											>
												<span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
												{item}
											</li>
										))}
									</ul>
								</section>

								{/* How We Collect Information */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										How We Collect Information
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										https://web.theaigo.com collects and receives information
										from you in the following manner:
									</p>
									<ul className="bg-gray-50 mb-4 rounded-lg p-4">
										<li className="text-gray-700 flex items-center">
											<span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
											When you interact with our Service.
										</li>
									</ul>
									<div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
										<p className="text-yellow-800">
											Your information will be stored for up to 3 days after it
											is no longer required to provide you the services. Your
											information may be retained for longer periods for
											reporting or record-keeping in accordance with applicable
											laws. Information which does not identify you personally
											may be stored indefinitely.
										</p>
									</div>
								</section>

								{/* How We Use Your Information */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										How We Use Your Information
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										https://web.theaigo.com may use your information for the
										following purposes:
									</p>
									<div className="mb-6 space-y-4">
										<div className="border-gray-200 rounded-lg border p-4">
											<h5 className="text-gray-800 mb-2 font-semibold">
												Providing and maintaining our Service
											</h5>
											<p className="text-gray-600">
												As well as monitoring the usage of our Service.
											</p>
										</div>
										<div className="border-gray-200 rounded-lg border p-4">
											<h5 className="text-gray-800 mb-2 font-semibold">
												For other purposes
											</h5>
											<p className="text-gray-600">
												New Verve Limited will use your information for data
												analysis to identify usage trends or determine the
												effectiveness of our marketing campaigns when
												reasonable. We will use your information to evaluate and
												improve our Service, products, services, and marketing
												efforts.
											</p>
										</div>
									</div>
								</section>

								{/* How We Share Your Information */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										How We Share Your Information
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										New Verve Limited will share your information, when
										applicable, in the following situations:
									</p>
									<ul className="bg-gray-50 mb-6 rounded-lg p-4">
										<li className="text-gray-700 flex items-start">
											<span className="bg-blue-500 mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full"></span>
											<div>
												<span className="font-semibold">
													With your consent.
												</span>{" "}
												New Verve Limited will share your information for any
												purpose with your explicit consent.
											</div>
										</li>
									</ul>
								</section>

								{/* Third-party Sharing */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										Third-party Sharing
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										Any third party we share your information with must disclose
										the purpose for which they intend to use your information.
										They must retain your information only for the duration
										disclosed when requesting or receiving said information. The
										third-party service provider must not further collect, sell,
										or use your personal information except as necessary to
										perform the specified purpose.
									</p>

									<p className="text-gray-700 mb-4 leading-relaxed">
										Your information may be shared to a third-party for reasons
										including:
									</p>

									<div className="mb-6 space-y-4">
										<div className="border-gray-200 rounded-lg border p-4">
											<h5 className="text-gray-800 mb-2 font-semibold">
												Analytics information
											</h5>
											<p className="text-gray-600">
												Your information might be shared with online analytics
												tools in order to track and analyse website traffic.
											</p>
										</div>
										<div className="border-gray-200 rounded-lg border p-4">
											<h5 className="text-gray-800 mb-2 font-semibold">
												Improving targeted advertising campaigns
											</h5>
											<p className="text-gray-600">
												New Verve Limited partners with third party service
												providers to improve targeted advertising campaigns.
											</p>
										</div>
									</div>

									<div className="bg-gray-50 border-gray-200 mb-6 rounded-lg border p-4">
										<p className="text-gray-700">
											If you choose to provide such information during
											registration or otherwise, you are giving New Verve
											Limited permission to use, share, and store that
											information in a manner consistent with this Privacy
											Policy.
										</p>
									</div>

									<p className="text-gray-700 mb-3 leading-relaxed">
										Your information may be disclosed for additional reasons,
										including:
									</p>
									<ul className="mb-6 space-y-2">
										{[
											"Complying with applicable laws, regulations, or court orders.",
											"Responding to claims that your use of our Service violates third-party rights.",
											"Enforcing agreements you make with us, including this Privacy Policy."
										].map((item, index) => (
											<li
												key={index}
												className="text-gray-700 flex items-start"
											>
												<span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
												{item}
											</li>
										))}
									</ul>
								</section>

								{/* Cookies Section */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										Cookies
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										Cookies are small text files that are placed on your
										computer by websites that you visit. Websites use cookies to
										help users navigate efficiently and perform certain
										functions. Cookies that are required for the website to
										operate properly are allowed to be set without your
										permission. All other cookies need to be approved before
										they can be set in the browser.
									</p>

									<div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
										<h5 className="mb-2 font-semibold text-green-800">
											Strictly necessary cookies
										</h5>
										<p className="text-green-700">
											Strictly necessary cookies allow core website
											functionality such as user login and account management.
											The website cannot be used properly without strictly
											necessary cookies.
										</p>
									</div>

									{/* Cookie Report Container */}
									<div className="cookie-report-container bg-blue-50 border-blue-200 mb-6 rounded-lg border-2 p-6">
										<div className="mb-4 text-center">
											<h5 className="text-blue-900 mb-2 text-lg font-semibold">
												Cookie Preferences
											</h5>
											<p className="text-blue-800" data-cookiereport="true">
												You can change your consent to cookie usage below.
											</p>
											<div
												className="cookie-script-wrapper"
												id="cookie-report-target"
											>
												{/* Script будет вставлять содержимое сюда */}
											</div>
										</div>
									</div>
								</section>

								{/* Security Section */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-3 text-xl font-medium">
										Security
									</h4>
									<div className="mb-4 border-l-4 border-orange-400 bg-orange-50 p-4">
										<p className="leading-relaxed text-orange-800">
											Your information&apos;s security is important to us.
											https://web.theaigo.com utilizes a range of security
											measures to prevent the misuse, loss, or alteration of the
											information you have given us. However, because we cannot
											guarantee the security of the information you provide us,
											you must access our service at your own risk.
										</p>
									</div>

									<p className="text-gray-700 leading-relaxed">
										New Verve Limited is not responsible for the performance of
										websites operated by third parties or your interactions with
										them. When you leave this website, we recommend you review
										the privacy practices of other websites you interact with
										and determine the adequacy of those practices.
									</p>
								</section>

								{/* Contact Us Section */}
								<section className="mb-8">
									<h4 className="text-gray-800 mb-4 text-xl font-medium">
										Contact Us
									</h4>
									<p className="text-gray-700 mb-4 leading-relaxed">
										For any questions, please contact us through the following
										methods:
									</p>

									<div className="bg-gray-50 border-gray-200 rounded-lg border p-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div>
												<p className="text-gray-700 mb-2">
													<span className="text-gray-900 font-semibold">
														Name:
													</span>{" "}
													New Verve Limited
												</p>
												<p className="text-gray-700 mb-2">
													<span className="text-gray-900 font-semibold">
														Address:
													</span>{" "}
													Paul Street, London, England, EC2A 4NE
												</p>
											</div>
											<div>
												<p className="text-gray-700 mb-2">
													<span className="text-gray-900 font-semibold">
														Email:
													</span>{" "}
													<a
														href="mailto:contact@newverve.co"
														className="text-blue-600 hover:text-blue-800 underline"
													>
														contact@newverve.co
													</a>
												</p>
												<p className="text-gray-700">
													<span className="text-gray-900 font-semibold">
														Website:
													</span>{" "}
													<a
														href="https://web.theaigo.com"
														className="text-blue-600 hover:text-blue-800 underline"
														target="_blank"
														rel="noopener noreferrer"
													>
														https://web.theaigo.com
													</a>
												</p>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
