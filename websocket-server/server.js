import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import HandlerHandler from './HandlerHandler.js';
import CollisionRect from './library/CollisionRect.js';
import Vector from './library/Vector.js';

const PORT = process.env.PORT || 8080;

HandlerHandler.registeredHandlers();

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

	const api = HandlerHandler.get("api");
	let responseData = api.receive(path, api.decodeArgs(Object.keys(args)));

	res.send(responseData);
});

const TARGET_FPS = 60;
const TARGET_MS = 1000 / TARGET_FPS;
let timing = TARGET_MS;
let fade = 0.1;

HandlerHandler.get("collision").addRect(
	new CollisionRect(
		new Vector(250, 600),
		new Vector(500, 50),
	)
);

HandlerHandler.get("collision").addRect(
	new CollisionRect(
		new Vector(400, 450),
		new Vector(300, 25),
	)
);

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
	HandlerHandler.tick();
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.\n\nClient: http://127.0.0.1:8080`);
});
