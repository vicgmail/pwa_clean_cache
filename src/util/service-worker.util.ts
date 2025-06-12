export const cleanServiceWorkerCache = async () => {
  if ('serviceWorker' in navigator) {
    const keys = await caches.keys();
    console.log('DELETE CACHE KEYS:', keys);
    for (const key of keys) {
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
  window.location.reload();
}
