import { create } from 'zustand';
import { apiClient } from '../api';

interface Character {
  id: string;
  name: string;
  image: string;
}

export interface SubscriptionData {
    active: boolean,
    cancelled: boolean,
    end: string,
    start: string,
    price: number,
    productId: string,
}

interface SubscriptionStore {
  isSubscriptionModalActive: boolean;
  isCancelConfirmModalActive: boolean;
  subscriptionData: SubscriptionData | null;
  recentChats: Character[] | null | undefined;
  subscriptionToken: string | null;
  isCancelSuccess: boolean | null;

  openSubscriptionModal: (data: SubscriptionData, token: string) => void;
  closeSubscriptionModal: () => void;
  requestCancelSubscription: () => Promise<void>; // Переименовано для ясности
  confirmCancelSubscription: () => Promise<void>;
  declineCancelSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  isSubscriptionModalActive: false,
  isCancelConfirmModalActive: false,
  subscriptionData: null,
  recentChats: null,
  subscriptionToken: null,
  isCancelSuccess: null,

  openSubscriptionModal: (data, token) => {
	
	set({ 
    isSubscriptionModalActive: true, 
    subscriptionData: data,
    subscriptionToken: token
  })},

  closeSubscriptionModal: () => set({ 
    isSubscriptionModalActive: false, 
    subscriptionData: null,
    subscriptionToken: null
  }),

  requestCancelSubscription: async () => {

	try {
		const recentChats = localStorage.getItem('chatStartedCharacters')
		if (!recentChats) return;

		const parsed = JSON.parse(recentChats);
		const lastFour = Array.isArray(parsed) ? parsed.slice(-4) : [];
		set({
			isSubscriptionModalActive: false, // Сначала закрываем модалку подписки
			isCancelConfirmModalActive: true, // Затем открываем подтверждение
			recentChats: lastFour
		})
	} catch (e) {
		console.log("failed to load recent chats", e)
	}


	// try {
    //   const response = await fetch('/api/recent_chats?limit=4');
    //   const recentChats = await response.json();
      
    //   set({
    //     isSubscriptionModalActive: false, // Сначала закрываем модалку подписки
    //     isCancelConfirmModalActive: true, // Затем открываем подтверждение
    //     recentChats
    //   });
    // } catch (error) {
    //   console.error('Failed to load recent chats:', error);
    // }


    // isSubscriptionModalActive: false, // Сначала закрываем модалку подписки
    // isCancelConfirmModalActive: true, // Затем открываем подтверждение
    //     // recentChats
  },

  confirmCancelSubscription: async () => {
    const { subscriptionToken } = get();
    if (!subscriptionToken) {
		console.log("net token")
		return
	};

		try {
		// isTokenExpired(subscriptionToken)
		const response = await apiClient.get(`/cancel_subscription?token=${subscriptionToken}`);
		if (response.status === 200) {
			console.log("response data::  ", response.data)
			set({
				isSubscriptionModalActive: true,
				isCancelSuccess: true,
				isCancelConfirmModalActive: false,
				subscriptionToken: null,
				recentChats: null
			});
		}
	} catch (e) {
		console.log("failed to cancel subscription", e)
		set({
			isSubscriptionModalActive: true,
			isCancelSuccess: false  // Флаг ошибки
		});
	}

	// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwOTg1NzhjNDg4MWRjMDVlYmYxOWExNWJhMjJkOGZkMWFiMzRjOGEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5kcmVpIEthbHBvdnNraSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKcU9pYlY2RVdFSFEwRFdzSkthVFZjOTYxYlZyRFlyVGtRaV9QMVczRHFVeXNZYlFZPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2FpZ28tZWM4ZjQiLCJhdWQiOiJhaWdvLWVjOGY0IiwiYXV0aF90aW1lIjoxNzQ1NDA0OTUwLCJ1c2VyX2lkIjoid3dUdGlsVHhvVGNSTERFRzU2UmdjZDBzaUlHMyIsInN1YiI6Ind3VHRpbFR4b1RjUkxERUc1NlJnY2Qwc2lJRzMiLCJpYXQiOjE3NDU1MDAwNDUsImV4cCI6MTc0NTUwMzY0NSwiZW1haWwiOiJha0BzZWN0LmRldiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE0NTQwNTA1MzgxNzk1OTAwMzQ5Il0sImVtYWlsIjpbImFrQHNlY3QuZGV2Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.RJeXMyNUvDzyfAMu70M-e_Fo9qrlvLIS_PXZJd1-8z68Aj5rQdUQ3V0zQoEmxq8NE_NL66MJL1yki7qAsYXhLQvM3aOdtQeD778uZzGeUSppAjufIhz3l6tkROfE3MrG39bEX-itFDQoXTv3AOI5i6dFtB7O40Y1BoJyPXnnIS_YGZDwXH6vhQ_9vus9mVhAw6Pu67mOkZVkkae48MRIhRgc4q6TerHEptlGqIW-Sq_P2tbkWp8r02REmo4HIClBGMTvxCfQLhLn3HIXrzl4-gLNmWs8YMp-XcUFkIjIRi29HhnutWcwQw4Lv3WlHv-Wuw_11wJEj3ZZD1iXzGa_TA"
// function isTokenExpired(token:string) {
//   const payload = JSON.parse(atob(token.split('.')[1]));
//   const result = payload.exp * 1000 < Date.now();

//   console.log(result)
//   return result;
// }

// const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwOTg1NzhjNDg4MWRjMDVlYmYxOWExNWJhMjJkOGZkMWFiMzRjOGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWlnby1lYzhmNCIsImF1ZCI6ImFpZ28tZWM4ZjQiLCJhdXRoX3RpbWUiOjE3NDU0ODg4NjAsInVzZXJfaWQiOiJaS1ZTZFFZVGlPWlB6TzYzRnA5WEY3V3BrSXAyIiwic3ViIjoiWktWU2RRWVRpT1pQek82M0ZwOVhGN1dwa0lwMiIsImlhdCI6MTc0NTQ5Nzg1OSwiZXhwIjoxNzQ1NTAxNDU5LCJlbWFpbCI6Im9heHZrdWF0dW9ubWt4d2N2eUBwb3Bsay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvYXh2a3VhdHVvbm1reHdjdnlAcG9wbGsuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.lMBGSe87L2cEso0khtRrUClM6_E60Z_sazMiVDZ6kFMuEMw78v0ORc8KZzlBP93LE5I-YUDT_vDSsUw2HZDlbl8NBT7f2dIoyaa8XMwTnnqt17kBZv1fURSNqT5DabUrRlOUe_RfBqiSuydP1CRVP1DhCfrnt8zNMB8-fPjk9eqfTD4-yejPnRm4KshCe0MZ9eQ3hi3fIfn4nbSR4IiCB6OafUAuLgIxhBO4dSv4EnbzcvYv9PJ2CxokdRHN39W4CGcRTD-urc3BSbCnXMK6eqd4fJhU5zUINUc8AEdh5zuNbZhnOsD_SlinyFx1hca4znHKFB0wTKzsOK4sagSBaQ"

    
    // try {
    //   await fetch(`/cancel_subscription?token=${subscriptionToken}`);
    //   set({ 
        // isCancelConfirmModalActive: false,
        // subscriptionToken: null,
        // recentChats: null
    //   });
    //   // Здесь можно добавить уведомление об успешной отмене
    // } catch (error) {
    //   console.error('Failed to cancel subscription:', error);
    // }
  },

    declineCancelSubscription: () => {
    set({ 
      isCancelConfirmModalActive: false,
      recentChats: null
    });
  }


}));