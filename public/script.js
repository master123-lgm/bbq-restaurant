const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Contact form handler
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const contact = { name, email, message, date: new Date().toISOString() };
  const filePath = path.join(__dirname, 'contacts.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let contacts = [];
    if (!err && data) {
      try {
        contacts = JSON.parse(data);
      } catch (e) {
        console.error("Error parsing contacts.json:", e);
      }
    }

    contacts.push(contact);

    fs.writeFile(filePath, JSON.stringify(contacts, null, 2), err => {
      if (err) {
        console.error('Error saving contact:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }
      res.status(200).json({ message: 'Contact saved successfully.' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
