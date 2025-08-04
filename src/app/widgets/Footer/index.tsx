import Link from "next/link";
import Image from "next/image";
import FooterLogo from "@/../public/images/img/aigo-logo.png";
import VisaLogo from "@/../public/images/img/visa-logo.png";
import MastercardLogo from "@/../public/images/img/mastercard-logo.png";

const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-center py-[12px] md:mb-[64px]">
			<div className="mb-[12px] text-[38px] font-bold leading-[150%] tracking-wide">
				<span className="bg-main-gradient bg-clip-text text-transparent">
					Ai
				</span>
				<span className="text-white">Go</span>
			</div>
			<div className="mb-[12px] flex items-center justify-center gap-[8px]">
				<Image
					src={VisaLogo}
					alt="logo"
					width={VisaLogo.width}
					height={VisaLogo.height}
				/>
				<Image
					src={MastercardLogo}
					alt="logo"
					width={MastercardLogo.width}
					height={MastercardLogo.height}
				/>
			</div>
			<div className="mb-[24px] max-w-[300px] text-center text-[14px] font-normal leading-[142%]">
				<span className="text-[#A8A9B1]">
					New Verve Limited 1530923586-90 Paul Street, London, England, EC2A 4NE
				</span>
			</div>

			<ul className="flex items-center justify-center gap-x-4 py-[10px] md:grid md:grid-rows-2 md:justify-items-center md:gap-y-4">
				<div className="flex gap-x-4">
					<li className="text-[14px] font-semibold leading-[100%]">
						<Link href="/terms">Terms & Conditions</Link>
					</li>
					<li className="text-[14px] font-semibold leading-[100%]">
						<Link href="/privacy">Privacy Policy</Link>
					</li>
					<li className="text-[14px] font-semibold leading-[100%]">
						<Link href="/legal-information">Legal</Link>
					</li>
				</div>

				<div className="flex gap-x-4">
					<li className="text-[14px] font-semibold leading-[100%]">
						<Link href="/billing">Billing Support</Link>
					</li>
					<li className="text-[14px] font-semibold leading-[100%]">
						<Link href="/complains">Complaints & Content Removal</Link>
					</li>
				</div>
			</ul>
		</footer>
	);
};

export default Footer;
