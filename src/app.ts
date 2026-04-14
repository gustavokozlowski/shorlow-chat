import cors from 'cors';
import express, { type Application } from 'express';
import mongoose from 'mongoose';
import { env } from 'process';

export class App {
	private express: Application;
	private port: number;
	private mongooseUri: string;

	constructor(port: number) {
		this.express = express();
		this.port = port;
		this.listen();

		this.mongooseUri = String(env.MONGODB_URI);
		this.database();
	}

	public initApp(): Application {
		return this.express;
	}

	private middlewares(): void {
		this.express.use(express.json());
		this.express.use(cors());
	}

	private listen(): void {
		this.express.listen(this.port, () => {
			console.log(`[Server running on port ${this.port}...]`);
		});
	}

	private async database(): Promise<void> {
		await mongoose.connect(this.mongooseUri);
		console.info('[Database connected]');
	}
}
