importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
);

workbox.routing.registerRoute(
	({ request }) => request.destination === 'image',
	new workbox.strategies.CacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		],
	}),
);

// Register event listener for the 'push' event.
self.addEventListener('push', function (event) {
	// Retrieve the textual payload from event.data (a PushMessageData object).
	// Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
	// on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
	const payload = event.data.text() || 'no payload';

	const parsedPayload = JSON.parse(payload);

	// Keep the service worker alive until the notification is created.
	event.waitUntil(
		// Show a notification with title 'ServiceWorker Cookbook' and use the payload
		// as the body.
		self.registration.showNotification(parsedPayload.title, {
			title: parsedPayload.title,
			body: parsedPayload.body,
			data: {
				chatID: parsedPayload.chatID,
				baseUrl: parsedPayload.baseUrl,
			},
			image: 'https://ticketless.fi/logo_pink_whiteBg.svg',
			vibrate: [300, 100, 400],
		}),
	);
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({ type: 'window' }).then(function (clientList) {
			const chatID = event.notification.data.chatID;
			const baseUrl = event.notification.data.baseUrl;
			for (var i = 0; i < clientList.length; i++) {
				var client = clientList[i];
				if ('focus' in client) {
					return client.focus().then(function () {
						return client.navigate(`${baseUrl}/chat/${chatID}`);
					});
				}
			}

			return clients.openWindow(`${baseUrl}/chat/${chatID}`);
		}),
	);
});

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open('my-cache').then(function (cache) {}));

	self.skipWaiting();
});
