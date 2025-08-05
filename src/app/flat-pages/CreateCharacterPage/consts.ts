export const PERSONALITY_OPTIONS = [
	{
		id: 1,
		icon: "/images/createpage/icons/protector.png",
		title: "Protector",
		description:
			"Warm, dependable, and always puts your needs first. Like a soft shield around you"
	},
	{
		id: 2,
		icon: "/images/createpage/icons/tease.png",
		title: "Tease",
		description:
			"Charming, cheeky, and thrives on tension. Flirtation as an art form"
	},
	{
		id: 3,
		icon: "/images/createpage/icons/goofball.png",
		title: "Goofball",
		description:
			"Silly, carefree, and unpredictable. Great for keeping things light and playful"
	},
	{
		id: 4,
		icon: "/images/createpage/icons/seducer.png",
		title: "Seducer",
		description:
			"Magnetic, confident, and thrives on slow, intense energy. Knows how to build desire"
	},
	{
		id: 5,
		icon: "/images/createpage/icons/mastermind.png",
		title: "Mastermind",
		description:
			"Decisive, commanding, and always in control. Likes when things go their way — especially you"
	},
	{
		id: 6,
		icon: "/images/createpage/icons/obedient.png",
		title: "Obedient",
		description:
			"Gentle, loyal, and loves to follow. Finds joy in pleasing and serving"
	},
	{
		id: 7,
		icon: "/images/createpage/icons/romantic.png",
		title: "Romantic",
		description:
			"Deeply emotional, sincere, and loving. Invested in connection and shared vulnerability"
	},
	{
		id: 8,
		icon: "/images/createpage/icons/craver.png",
		title: "Craver",
		description:
			"Unapologetically hungry for passion. Sensual, intense, and always ready for more"
	},
	{
		id: 9,
		icon: "/images/createpage/icons/icy.png",
		title: "Icy",
		description:
			"Detached, blunt, and not afraid to put you in your place. Can be cruel — or thrilling"
	}
];

export interface OptionType {
	id: number;
	title: string;
	icon: string;
	description: string;
}

export const HOBBIES_OPTIONS = [
	{
		id: 1,
		icon: "/images/createpage/icons/yoga.png",
		text: "Yoga"
	},
	{
		id: 2,
		icon: "/images/createpage/icons/dance.png",
		text: "Dance"
	},
	{
		id: 3,
		icon: "/images/createpage/icons/creativewriting.png",
		text: "Creative writing"
	},
	{
		id: 4,
		icon: "/images/createpage/icons/photography.png",
		text: "Photography"
	},
	{
		id: 5,
		icon: "/images/createpage/icons/cosplay.png",
		text: "Cosplay"
	},
	{
		id: 6,
		icon: "/images/createpage/icons/reading.png",
		text: "Reading"
	},
	{
		id: 7,
		icon: "/images/createpage/icons/drawing.png",
		text: "Drawing"
	},
	{
		id: 8,
		icon: "/images/createpage/icons/videogames.png",
		text: "Playing video games"
	},
	{
		id: 9,
		icon: "/images/createpage/icons/lingerie.png",
		text: "Collecting lingerie"
	},
	{
		id: 10,
		icon: "/images/createpage/icons/journaling.png",
		text: "Journaling"
	},
	{
		id: 11,
		icon: "/images/createpage/icons/musicfestivals.png",
		text: "Attending music festivals"
	},
	{
		id: 12,
		icon: "/images/createpage/icons/cooking.png",
		text: "Cooking"
	},
	{
		id: 13,
		icon: "/images/createpage/icons/gym.png",
		text: "Gym"
	},
	{
		id: 14,
		icon: "/images/createpage/icons/travelling.png",
		text: "Travelling"
	},
	{
		id: 15,
		icon: "/images/createpage/icons/newlanguages.png",
		text: "Learning new languages"
	},
	{
		id: 16,
		icon: "/images/createpage/icons/cars.png",
		text: "Cars"
	},
	{
		id: 17,
		icon: "/images/createpage/icons/football.png",
		text: "Football"
	},
	{
		id: 18,
		icon: "/images/createpage/icons/netflix.png",
		text: "Netflix"
	},
	{
		id: 19,
		icon: "/images/createpage/icons/politics.png",
		text: "Politics"
	}
];

export const RELATIONSHIP_OPTIONS = [
	{
		id: 1,
		text: "Girl-Next-Door"
	},
	{
		id: 2,
		text: "Colleague"
	},
	{
		id: 3,
		text: "Classmate"
	},
	{
		id: 4,
		text: "Best Friend"
	},
	{
		id: 5,
		text: "Neighbor"
	},
	{
		id: 6,
		text: "Teammate"
	},
	{
		id: 7,
		text: "Sibling"
	},
	{
		id: 8,
		text: "Mentor"
	},
	{
		id: 9,
		text: "Roommate"
	},
	{
		id: 10,
		text: "Acquaintance"
	}
];

export interface HobbiesOptionType {
	id: number;
	icon: string;
	text: string;
}
