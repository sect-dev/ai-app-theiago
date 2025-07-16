import clsx from "clsx";
import { useTranslations } from "next-intl";

interface ItemProps {
	id: number;
	name: string;
	description: string;
}

interface Props {
	className?: string;
}

const HowItWorks = (props: Props) => {
	const { className } = props;
	const t = useTranslations("AffiliatePage");

	const HOW_IT_WORKS_ITEMS = [
		{
			id: 1,
			name: t("affiliate_how_it_works_sign_up"),
			description: t("affiliate_how_it_works_sign_up_desc")
		},
		{
			id: 2,
			name: t("affiliate_how_it_works_get_authorized"),
			description: t("affiliate_how_it_works_get_authorized_desc")
		},
		{
			id: 3,
			name: t("affiliate_how_it_works_share"),
			description: t("affiliate_how_it_works_share_desc")
		}
	];

	return (
		<div
			className={clsx(
				"rounded-bl-[24px] rounded-tl-[24px] bg-[#121423] p-[24px] md:rounded-[24px]",
				className
			)}
		>
			<span className="mb-[16px] block text-[24px] font-semibold leading-[1.3] tracking-wide">
				{t("affiliate_how_it_works_title")}
			</span>
			<div className="flex flex-row gap-[16px] md:flex-col">
				{HOW_IT_WORKS_ITEMS.map((item) => (
					<HowItWorksItem key={item.id} {...item} />
				))}
			</div>
		</div>
	);
};

const HowItWorksItem = (props: ItemProps) => {
	const { name, description, id } = props;
	return (
		<div className="max-w-[332px] rounded-[24px] bg-[#2B2D44] bg-blue-layered-gradient p-[16px]">
			<div className="flex flex-col">
				<div className="mb-[16px] flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#121423]">
					<span className="text-[20px] font-semibold leading-[1.3] tracking-wide">
						{id}
					</span>
				</div>
				<span className="mb-[8px] text-[20px] font-bold leading-[24px]">
					{name}
				</span>
				<span className="text-[14px] font-semibold leading-[16px] text-[#9DB2CE]">
					{description}
				</span>
			</div>
		</div>
	);
};

export default HowItWorks;
