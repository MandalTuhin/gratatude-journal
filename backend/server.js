const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'entries.json');

//load or create entries file
if(!fs.existsSync(DATA_FILE)){
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');

}

//POST endpoint to recieve entries

app.post('/entry', (req, res) => {
    if(!text) return res.status(400).json({error: 'Text is required'});
    const entries = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const newEntry = {
        id: Date.now(), text, date: new Date().toISOString()
    };

    entries.push(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');

    res.status(201).json({
        message: 'Entry saved'
    });
});

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});