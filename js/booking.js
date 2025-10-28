// js/booking.js
document.addEventListener("DOMContentLoaded", async () => {
  toast("Loading booking form...");

  const data = await callApi("getBookingFormData");
  if (data.error) return toast("Error loading data");

  // Populate property dropdown
  const propertySelect = document.getElementById("property");
  propertySelect.innerHTML =
    "<option value=''>— Select —</option>" +
    data.properties.map(p => `<option value="${p.name}">${p.name}</option>`).join("");

  // Handle form submission
  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const payload = {
      propertyName: propertySelect.value,
      cleaningDate: document.getElementById("date").value,
      startTime: document.getElementById("start").value,
      endTime: document.getElementById("end").value,
      cleaners: [], // can be added later
      linenRequired: document.getElementById("linen").value,
      notes: document.getElementById("notes").value,
    };

    const res = await callApi("createBooking", payload);
    if (res.success) toast(`Booking saved (#${res.bookingId})`);
    else toast("Failed to save booking");
  });
});
