document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const countryCode = document.getElementById("countryCode").value;
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const responseMsg = document.getElementById("responseMsg");

  responseMsg.textContent = "";

  // ✅ 1. Validate name (must be 3 parts)
  const nameParts = name.split(" ");
  if (nameParts.length < 3) {
    responseMsg.textContent = "⚠️ Please enter your full triple name.";
    responseMsg.style.color = "red";
    return;
  }

  // ✅ 2. Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    responseMsg.textContent = "⚠️ Please enter a valid email address.";
    responseMsg.style.color = "red";
    return;
  }

  // ✅ 3. Validate phone
  const phoneRegex = /^[0-9]{6,15}$/;
  if (!phoneRegex.test(phone)) {
    responseMsg.textContent = "⚠️ Please enter a valid phone number.";
    responseMsg.style.color = "red";
    return;
  }

  // Combine country code + number
  const fullPhone = `${countryCode}${phone}`;

});
