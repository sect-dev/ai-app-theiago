import { create } from "zustand";

type playingType = "video" | "audio" | null;

interface MediaState {
	currentPlaying: playingType;
	currentPlayingVideo: HTMLVideoElement | null;
	setCurrentPlaying: (type: playingType) => void;
	setCurrentPlayingVideo: (video: HTMLVideoElement | null) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
	currentPlaying: null,
	currentPlayingVideo: null,
	setCurrentPlaying: (type: playingType) => set({ currentPlaying: type }),
	setCurrentPlayingVideo: (video) => set({ currentPlayingVideo: video })
}));
