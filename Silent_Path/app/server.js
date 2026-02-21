import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

app.use(express.json());

async function connectDatabase() {
  if (!DATABASE_URI) {
    console.warn('DATABASE_URL/MONGODB_URI is not set. Running without database connection.');
    return;
  }

  try {
    await mongoose.connect(DATABASE_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    dbState: mongoose.connection.readyState,
  });
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
