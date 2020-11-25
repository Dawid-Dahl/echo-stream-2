export interface IStartTwitterStream {
	startTwitterStream(hashtag: string[]): void;
}

export interface IStopTwitterStream {
	stopTwitterStream(): void;
}

export interface IShutDownAndCleanUpAfterEchoStream {
	stopTwitterStream(): void;
}
