import { API_URL } from "../config/env";


const publicVapidKey =
  "BHEuMUxQDOdfIWqHg7yGLuTVZZwpnJvKg4_YCnTKJ7wZewWqnbvah0hwKmbMErVxfAOGtHxdM7Lj9CQS8iR6lVE";

//register the service worker, register our push api, sedn the notifation
async function send(user_id) {
  //register service worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });

  //register push
  setTimeout(async function () {
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    //Send push notification
    await fetch(`${API_URL}/preparticipants/notification/${user_id}`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    });
  }, 2000);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
