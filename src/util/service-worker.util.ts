export const cleanServiceWorkerCache = async () => {
  if ('serviceWorker' in navigator) {
    for (const key of await caches.keys()) {
      console.log('DELETE CACHE:', key);
      await caches.delete(key);
    }
  }
}

export const updateServiceWorkerRegistration = async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) {
    console.log('UPDATE reg:', reg);
    reg.update();
  }
}
