import TextareaAutosize from "react-textarea-autosize";
import { useState, useEffect } from "react";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";

const TextArea = () => {
	const { setRequest, request } = useCharacterCreateStore();

	const [localRequest, setLocalRequest] = useState(request);

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
				Image description
			</span>
			<TextareaAutosize
				placeholder="Type what you want to see in the image"
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
