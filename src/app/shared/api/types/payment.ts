interface TokenPackage {
	currency: string;
	amount: number;
	tokens_count: number;
	description: string;
	places: string[];
}

type TokenPackageKey = `${number}-tokens` | `${number}_tokens`;

export interface StrictTokenPackage {
	currency: string;
	price: number;
	old_price: number;
	lable: string;
	tokens_count: number;
	description: string;
	places: ["tokens-paywall"];
}

export type StrictTokenPackages = Record<TokenPackageKey, StrictTokenPackage>;

interface TokenPackages {
	[key: string]: TokenPackage;
}

const tokenPackages: TokenPackages = {
	"100-tokens": {
		currency: "USD",
		amount: 9.99,
		tokens_count: 100,
		description: "100 tokens",
		places: ["tokens-paywall"]
	},
	"500_tokens": {
		currency: "USD",
		amount: 49.99,
		tokens_count: 500,
		description: "500 tokens",
		places: ["tokens-paywall"]
	}
};
