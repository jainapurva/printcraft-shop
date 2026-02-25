import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: string;
  phone?: string;
  address?: string;
  watchlist: string[]; // product IDs
  createdAt: string;
  updatedAt: string;
}

function ensureDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }));
}

function getDB(): { users: UserProfile[] } {
  ensureDB();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function saveDB(data: { users: UserProfile[] }) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function findUserByEmail(email: string): UserProfile | undefined {
  const db = getDB();
  return db.users.find(u => u.email === email);
}

export function upsertUser(data: { email: string; name: string; image?: string; provider: string }): UserProfile {
  const db = getDB();
  const existing = db.users.find(u => u.email === data.email);

  if (existing) {
    existing.name = data.name || existing.name;
    existing.image = data.image || existing.image;
    existing.updatedAt = new Date().toISOString();
    saveDB(db);
    return existing;
  }

  const user: UserProfile = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: data.email,
    name: data.name,
    image: data.image,
    provider: data.provider,
    watchlist: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.users.push(user);
  saveDB(db);
  return user;
}

export function updateUserProfile(email: string, updates: { phone?: string; address?: string; name?: string }): UserProfile | null {
  const db = getDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return null;

  if (updates.phone !== undefined) user.phone = updates.phone;
  if (updates.address !== undefined) user.address = updates.address;
  if (updates.name !== undefined) user.name = updates.name;
  user.updatedAt = new Date().toISOString();
  saveDB(db);
  return user;
}

export function toggleWatchlistItem(email: string, productId: string): string[] {
  const db = getDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return [];

  const idx = user.watchlist.indexOf(productId);
  if (idx === -1) {
    user.watchlist.push(productId);
  } else {
    user.watchlist.splice(idx, 1);
  }
  user.updatedAt = new Date().toISOString();
  saveDB(db);
  return user.watchlist;
}
