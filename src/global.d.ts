declare module 'bun' {
	interface Env {
		JWT_SECRET: string;
		JWT_EXPIRES_IN: string;
		SERVER_PORT: string;
		MONGODB_URI: string;
	}
}
