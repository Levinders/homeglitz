/**
 * booking.js
 * -----------
 * Handles page-specific logic for the booking form.
 * Fetches property data, manages form submission, and handles UI resets.
 */

document.addEventListener("DOMContentLoaded", async () => {
  toast("Loading booking form...");

  // 🧾 Step 1: Fetch form data (property list, defaults, etc.)
  const data = await callApi("getBookingFormData");
  if (data.error) return toast("Error loading data");

  // 🏠 Step 2: Populate property dropdown
  const propertySelect = document.getElementById("property");
  propertySelect.innerHTML =
    "<option value=''>— Select —</option>" +
    data.properties.map(p => `<option value='${p.name}'>${p.name}</option>`).join("");

  // 🧹 Step 3: Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", async e => {
    e.preventDefault();

    const payload = {
      propertyName: propertySelect.value,
      cleaningDate: document.getElementById("date").value,
      startTime: document.getElementById("start").value,
      endTime: document.getElementById("end").value,
      linenRequired: document.getElementById("linen").value,
      notes: document.getElementById("notes").value,
    };

    const res = await callApi("createBooking", payload);

    if (res.success) toast(`Booking saved successfully (#${res.bookingId})`);
    else toast("Failed to save booking — please try again.");
  });

  // ♻️ Step 4: Handle reset button
  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("bookingForm").reset();
    toast("Form cleared");
  });
});
