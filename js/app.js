/**
 * app.js
 * -------
 * Shared global utilities and API communication helpers.
 * Used by all pages (booking, properties, cleaners, etc.)
 */

// 🧩 Replace this with your actual Apps Script Web App deployment URL
const API_URL = "https://script.google.com/macros/s/AKfycbzxYBxLSqvIgNBfl0WOVPzVAsAjYxoU5kw_xj-ZuXmvU1x9fXLRYdA98yTF3Q0Lj3SP/exec";

/**
 * 🛰️ callApi(action, payload)
 * Generic helper to call your Apps Script backend.
 * @param {string} action - backend function (e.g., 'createBooking')
 * @param {object} payload - data to send to backend
 */
async function callApi(action, payload = {}) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return { error: err.message };
  }
}

/**
 * 🪄 toast(message)
 * Simple notification system for feedback messages.
 * Appears briefly then fades out automatically.
 */
function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return alert(message);
  el.textContent = message;
  el.style.opacity = 1;
  setTimeout(() => (el.style.opacity = 0), 3000);
}
