// js/app.js
const API_URL = "https://script.google.com/macros/s/AKfycbzxYBxLSqvIgNBfl0WOVPzVAsAjYxoU5kw_xj-ZuXmvU1x9fXLRYdA98yTF3Q0Lj3SP/exec";

/**
 * Generic API caller for all backend actions
 * @param {string} action - backend action (e.g. 'createBooking')
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

// Simple toast popup
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return alert(msg);
  el.textContent = msg;
  el.style.opacity = 1;
  setTimeout(() => (el.style.opacity = 0), 3000);
}
