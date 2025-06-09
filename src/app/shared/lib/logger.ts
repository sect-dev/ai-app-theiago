import log from "loglevel";

// Только включаем логирование, если окружение явно stage
const isStage = process.env.NEXT_PUBLIC_ENV === "stage";

if (isStage) {
  log.setLevel("debug"); // Показываем все логи
} else {
  log.setLevel("silent"); // Отключаем логи
}

export default log;
