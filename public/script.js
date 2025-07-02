document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusMsg = document.getElementById('formStatus');

  if (!name || !email || !message) {
    statusMsg.textContent = "Please fill out all fields.";
    statusMsg.classList.remove('hidden');
    statusMsg.classList.remove('text-green-600');
    statusMsg.classList.add('text-red-600');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    statusMsg.textContent = "Please enter a valid email address.";
    statusMsg.classList.remove('hidden');
    statusMsg.classList.remove('text-green-600');
    statusMsg.classList.add('text-red-600');
    return;
  }

  // Send to backend
  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();
    if (response.ok) {
      statusMsg.textContent = result.message;
      statusMsg.classList.remove('text-red-600');
      statusMsg.classList.add('text-green-600');
      statusMsg.classList.remove('hidden');
      this.reset();
    } else {
      throw new Error(result.error || "Submission failed");
    }
  } catch (err) {
    statusMsg.textContent = err.message;
    statusMsg.classList.remove('hidden');
    statusMsg.classList.remove('text-green-600');
    statusMsg.classList.add('text-red-600');
  }
});