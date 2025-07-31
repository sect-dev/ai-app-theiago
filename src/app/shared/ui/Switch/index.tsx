import { useState } from "react";
import { Switch } from "@headlessui/react";

const SwitchButton = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<Switch
			checked={enabled}
			// onChange={handleChange}
			className={`${
				enabled ? "bg-white/20" : "bg-white/10"
			} relative inline-flex h-7 w-14 items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none`}
		>
			<span
				className={`${
					enabled ? "translate-x-7" : "translate-x-0"
				} inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
			/>
		</Switch>
	);
};

export default SwitchButton;
