import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import API from './API.js';

const PORT = process.env.PORT || 8080;

API.registerCalls();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serving static files
app.use(express.static(path.join(__dirname, '..', 'websocket-client')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'websocket-client', 'index.html'));
});

app.get('/*', (req, res) => {
	const fullPath = req.params[0]; // Accessing the wildcard parameter for route
	const path = fullPath.split('?')[0]; // Extracting the route without query params
	const args = req.query; // Accessing the query parameters

	let responseData = API.receive(path, API.decodeArgs(Object.keys(args)));

	res.send(responseData);
});

const TARGET_FPS = 60;
const TARGET_MS = 1000 / TARGET_FPS;
let timing = TARGET_MS;
let fade = 0.1;

function gameLoop() {
	let before = performance.now();
	gameTick();
	let after = performance.now();
  let delta = after - before;
	let diff = TARGET_MS - delta;
	timing = timing * (1 - fade) + diff * fade;
	setTimeout(gameLoop, timing);
} gameLoop();

function gameTick() {

}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.\n\nClient: http://127.0.0.1:8080`);
});
