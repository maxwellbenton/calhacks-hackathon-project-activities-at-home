import { openDB } from 'idb';

export const dbPromise = openDB('app-store', 1, {
  upgrade(db) {
    db.createObjectStore('data');
  },
});
 
export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get('data', key);
  },
  async set(key, val) {
    return (await dbPromise).put('data', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('data', key);
  },
  async clear() {
    return (await dbPromise).clear('data');
  },
  async keys() {
    return (await dbPromise).getAllKeys('data');
  },
};