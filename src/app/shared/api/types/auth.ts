import { User } from "firebase/auth";

export interface FirebaseUser extends User {
	accessToken: string;
	stsTokenManager: {
		refreshToken: string;
		accessToken: string;
		expirationTime: number;
	};
	createdAt: string;
	lastLoginAt: string;
	apiKey: string;
	appName: string;
}

export type EmailLinkAuthResponse =
	| {
			success: true;
			message: string;
	  }
	| {
			success: false;
			message: string;
	  };

export interface UserSubscriptionInfo {
	subscription: {
		start: string;
		end: string;
		active: boolean | null;
		purchases: Record<string, unknown>;
		price: number;
		currency: string;
	};
	tokens: number;
}
