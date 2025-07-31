import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";

const TextAreaName = () => {
	const { name, setName } = useGenerateImageStore();
	const [localRequest, setLocalRequest] = useState(name);

	useEffect(() => {
		setLocalRequest(name);
	}, [name]);

	const handleRequestUpdate = () => {
		setName("reset");
		setName(localRequest);
	};

	return (
		<div className="flex flex-col items-start gap-[4px]">
			<span className="text-[14px] font-medium">Name</span>
			<TextareaAutosize
				placeholder="Input here"
				className="w-full bg-transparent text-[16px] font-medium"
				minRows={1}
				maxRows={1}
				value={localRequest}
				onChange={(e) => setLocalRequest(e.target.value)}
				onBlur={handleRequestUpdate}
			/>
		</div>
	);
};

export default TextAreaName;
