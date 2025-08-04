import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const TextAreaDesc = () => {
	const { relationship, setRelationship } = useGenerateImageStore();
	const [localRelationship, setLocalRelationship] = useState(relationship);

	useEffect(() => {
		setLocalRelationship(relationship);
	}, [relationship]);

	const handleRequestUpdate = () => {
		setRelationship("reset");
		setRelationship(localRelationship);
	};

	return (
		<div className="flex flex-col items-start gap-[4px]">
			<span className="text-[14px] font-medium">Relationships description</span>
			<TextareaAutosize
				placeholder="She is my former roommate"
				className="w-full bg-transparent text-[16px] font-medium"
				minRows={2}
				maxRows={5}
				value={localRelationship}
				onChange={(e) => setLocalRelationship(e.target.value)}
				onBlur={handleRequestUpdate}
			/>
		</div>
	);
};

export default TextAreaDesc;
