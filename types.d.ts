declare namespace Express {
	export interface Request {
		session?: Express.Session;
		sessionID?: string;
	}
}
