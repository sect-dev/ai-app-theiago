import TextareaAutosize from "react-textarea-autosize";
import { useState, useEffect } from "react";
import { useGenerateImageStore } from "@/app/shared/store/generateImageStore";
import { useTranslations } from "next-intl";

const TextArea = () => {
	const { setRequest, request } = useGenerateImageStore();

	const [localRequest, setLocalRequest] = useState(request);
	const t = useTranslations("ImageGenerator");

	useEffect(() => {
		setLocalRequest(request);
	}, [request]);

	const handleRequestUpdate = () => {
		setRequest("reset");
		setRequest(localRequest);
	};
	return (
		<div className="grid grid-rows-[auto_1fr] gap-[4px]">
			<span className="text-[14px] font-medium opacity-50">
				{t("generator_textarea_description")}
			</span>
			<TextareaAutosize
				placeholder={t("generator_textarea_placeholder")}
				className="w-full bg-[#121423]"
				minRows={5}
				maxRows={5}
				value={localRequest}
				onChange={(e) => setLocalRequest(e.target.value)}
				onBlur={handleRequestUpdate}
			/>
		</div>
	);
};

export default TextArea;
