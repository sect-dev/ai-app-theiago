import axios from 'axios';
import { safeLocalStorage } from '.';

const CLICKID_KEY = 'clickid';
const CLICKID_EXPIRY_KEY = 'clickid_expiry';
const DAYS_TO_EXPIRE = 30;


/**
 * Сохраняет clickid в localStorage с временем истечения (30 дней)
 * @param clickId ID клика для сохранения
 */
export const saveClickId = (clickId: string): void => {
  if (!clickId) return;
  
  try {
    // Вычисляем время истечения (текущее время + 30 дней в миллисекундах)
    const expiryDate = Date.now() + (DAYS_TO_EXPIRE * 24 * 60 * 60 * 1000);
    
    // Сохраняем clickid и время истечения в localStorage
    safeLocalStorage.set(CLICKID_KEY, clickId);
    safeLocalStorage.set(CLICKID_EXPIRY_KEY, expiryDate.toString());
    console.log('clickId сохранен', clickId);
  } catch (error) {
    console.error('Ошибка при сохранении clickId:', error);
  }
};

/**
 * Получает сохраненный clickid, если он не истек
 * @returns Сохраненный clickid или null, если его нет или он истек
 */
export const getClickId = (): string | null => {
  try {
    const clickId = safeLocalStorage.get(CLICKID_KEY);
    const expiryString = safeLocalStorage.get(CLICKID_EXPIRY_KEY);
    
    if (!clickId || !expiryString) return null;
    
    const expiry = parseInt(expiryString, 10);
    const now = Date.now();
    
    // Проверяем, не истек ли срок действия
    if (now > expiry) {
      // Если истек, удаляем данные и возвращаем null
      safeLocalStorage.remove(CLICKID_KEY);
      safeLocalStorage.remove(CLICKID_EXPIRY_KEY);
      return null;
    }
    console.log('clickId получен', clickId);
    return clickId;
  } catch (error) {
    console.error('Ошибка при получении clickId:', error);
    return null;
  }
};

/**
 * Отправляет запрос на трекинг при нажатии кнопки "Купить"
 */
export const trackBuyButtonClick = async (): Promise<void> => {
  const clickId = getClickId();
  if (!clickId) return;
  
  try {
    // Отправляем GET запрос на трекинг
    const response = await axios.get(`https://track.theaigo.com/click.php?cnv_id=${clickId}&payout=0&cnv_status=buy_button`);
    
    if (response.status !== 200) {
      throw new Error(`Ошибка трекинга: ${response.status}`);
    }
    
    console.log(`Успешно отправлен трекинг buy_button для clickId: ${clickId}`);
  } catch (error) {
    console.error('Ошибка при отправке трекинга buy_button:', error);
  }
};

/**
 * Отправляет запрос на трекинг при успешной активации подписки
 * @param payout Стоимость подписки
 */
export const trackPurchaseSuccess = async (payout: number): Promise<void> => {
  const clickId = getClickId();
  if (!clickId) return;
  
  try {
    // Отправляем GET запрос на трекинг успешной покупки
    const response = await axios.get(`https://track.theaigo.com/click.php?cnv_id=${clickId}&payout=${payout}&cnv_status=purchase`);
    
    if (response.status !== 200) {
      throw new Error(`Ошибка трекинга: ${response.status}`);
    }
    
    console.log(`Успешно отправлен трекинг purchase для clickId: ${clickId}, payout: ${payout}`);
  } catch (error) {
    console.error('Ошибка при отправке трекинга purchase:', error);
  }
};