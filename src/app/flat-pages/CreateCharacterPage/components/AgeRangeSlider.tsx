import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import clsx from "clsx";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";

const AGE_VALUES = [18, 19, 20, 23, 25, 30, 35, 45, 55];

const AgeRangeSlider = () => {
	const { ageChar, setAge } = useGenerateImageStore();

	const index =
		AGE_VALUES.indexOf(ageChar) >= 0
			? AGE_VALUES.indexOf(ageChar)
			: AGE_VALUES.indexOf(20);
	const percent = (index / (AGE_VALUES.length - 1)) * 100;

	console.log("ageChar", ageChar);

	const handleSliderChange = (val: number | number[]) => {
		setAge(AGE_VALUES[val as number]);
	};

	return (
		<div className="mb-[32px] flex w-full max-w-md flex-col items-center rounded-xl">
			<span className="mb-[12px] text-[18px] font-bold leading-[130%] tracking-wide text-white">
				Age
			</span>

			<div className="relative w-full px-[12px] pt-4">
				{/* Bubble */}
				<div
					className="absolute top-[-12px] -translate-x-1/2 transform transition-all duration-100"
					style={{ left: `${percent}%` }}
				>
					<div className="rounded-lg bg-main-gradient px-2 py-1 text-xs font-bold text-white shadow-md">
						{ageChar}
					</div>
				</div>

				{/* Slider */}
				<Slider
					min={0}
					max={AGE_VALUES.length - 1}
					value={index}
					onChange={handleSliderChange}
					step={1}
					trackStyle={{ backgroundColor: "#049AEF", height: 8 }}
					railStyle={{ backgroundColor: "#1D1F37", height: 8 }}
					handleStyle={{
						borderColor: "#fff",
						height: 20,
						width: 20,
						marginTop: -6,
						backgroundColor: "#fff",
						boxShadow: "none",
						opacity: 1
					}}
				/>

				{/* Tick marks */}
				<div className="mt-[8px] flex w-full justify-between text-[10px] font-semibold opacity-50">
					{AGE_VALUES.map((val) => (
						<div
							key={val}
							className="flex flex-col items-center justify-center"
						>
							<div className="mb-[2px] h-[4px] w-[1px] rounded-[1px] bg-[#797979]"></div>
							<span
								className={clsx(
									(val === 19 || val === 23 || val === 30 || val === 45) &&
										"invisible"
								)}
							>
								{val}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AgeRangeSlider;
