import { env } from 'process';
import { App } from './app';

const app = new App(Number(env.SERVER_PORT));
app.initApp();
