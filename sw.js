/* === sw.js - Der Hintergrund-Arbeiter === */

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Sofort aktivieren
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Wenn man auf die Benachrichtigung klickt -> App öffnen
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // Wenn App schon offen, fokussieren
            for (const client of clientList) {
                if (client.url && 'focus' in client) return client.focus();
            }
            // Sonst neu öffnen
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
