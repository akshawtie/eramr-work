import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, 'src', 'data', 'products.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// A quick hack since products.js is just a JS module with an array:
// We can use a regex to extract CATEGORIES and products arrays, but it's easier to just read the file, parse it, and rewrite it.
// However, the file has descriptions and images, we can't easily eval it without Babel if it has ES modules.
