import Link from "next/link";

const LEGAL_INFORMATION = [
	{
		id: 1,
		title: "Terms of Service",
		link: "/terms"
	},
	{
		id: 2,
		title: "Privacy Policy",
		link: "/privacy"
	},
	{
		id: 3,
		title: "DMCA Policy",
		link: "/dmca-policy"
	},
	{
		id: 4,
		title: "2257 Exemption Statement",
		link: "/2257-exemption"
	},
	{
		id: 5,
		title: "Complains",
		link: "/complains"
	},
	{
		id: 6,
		title: "Cookie Policy",
		link: "/cookies-policy"
	},
	{
		id: 7,
		title: "Billing",
		link: "/billing"
	}
];

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-[20px] p-[20px]">
			<h1 className="mb-2 text-2xl font-bold">Legal Information</h1>
			<div className="flex flex-col items-center gap-[10px]">
				{LEGAL_INFORMATION.map((item) => (
					<Link
						className="rounded-[16px] bg-[#2B2D44] p-[10px] hover:bg-[#3B3D54]"
						key={item.id}
						href={item.link}
					>
						{item.title}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Page;
