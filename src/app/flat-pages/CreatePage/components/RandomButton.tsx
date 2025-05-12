import Image from "next/image";
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { STEPS } from '@/app/shared/consts/suggestions';


const RandomButton = () => {
	const { censorship, setRequest } = useCharacterCreateStore();

	const handleRandomClick = () => {
		// Создаем массив случайных подсказок из каждой категории
		const randomSuggestions = [];
		
		// Проходим по всем категориям
		for (const category in STEPS) {
			if (Object.prototype.hasOwnProperty.call(STEPS, category)) {
				// Получаем список подсказок для текущей категории и цензуры
				const suggestions = STEPS[category as keyof typeof STEPS][censorship] || [];
				
				if (suggestions.length > 0) {
					// Выбираем случайную подсказку из этой категории
					const randomIndex = Math.floor(Math.random() * suggestions.length);
					const randomSuggestion = suggestions[randomIndex];
					
					// Добавляем в массив случайных подсказок
					randomSuggestions.push(randomSuggestion);
				}
			}
		}
		
		// Объединяем все подсказки в одну строку и устанавливаем в request
		if (randomSuggestions.length > 0) {
			// Сбрасываем текущий request (чтобы не добавлять к существующему)
			setRequest("reset"); // Это потребует изменения в store
			
			// Затем добавляем все случайные подсказки
			randomSuggestions.forEach(suggestion => {
				setRequest(suggestion);
			});
		}
	};

	return (
		<button onClick={handleRandomClick} className="flex items-center justify-center gap-[4px] bg-[#003B5F] py-[2px] px-[8px] rounded-[16px]">
			<Image
				src="/images/icons/icon-random-button.svg"
				width={24}
				height={24}
				alt="change button"
			/>
			<span className='font-medium text-[14px] text-[#0394EC]'>Random</span>
		</button>
	)
}

export default RandomButton;