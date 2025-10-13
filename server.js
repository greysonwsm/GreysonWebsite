const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Please provide username and password' });
    }

    // Format the data
    const data = `Username: ${username}, Password: ${password}\n`;

    // Append to a file called users.txt
    fs.appendFile('users.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Failed to save user' });
        }

        res.json({ success: true, message: 'User saved to file!' });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
