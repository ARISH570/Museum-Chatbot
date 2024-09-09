const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken');
const connectDB = require('./db'); // Import the DB connection file
const mongoose = require('mongoose');
const Ticket = require('./models/ticket'); 
const bodyParser = require('body-parser');
const  i18nMiddleware = require('./middlewares/i18n');
const Event = require('./models/Event');
const User = require('./models/user'); 


//const location = require('./models/location');

//ii8n not working
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();
/*
app.use(bodyParser.json());
app.use(i18nMiddleware);

app.post('/set-language', (req, res) => {
  const locale = req.body.locale;
  if (i18n.getLocales().includes(locale)) {
    req.setLocale(locale);
    res.send(`Language set to ${locale}`);
  } else {
    res.status(400).send('Invalid locale');
  }
});
*/
// Test route OK
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});


// User Registration Route OK
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Please fill all the fields.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save(); // Save user in the database
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});
//OK
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.status(200).send({ token });
});


// Book ticket route OK
app.post('/api/tickets/book', async (req, res) => {
    try {
        const { user, museum, date, price } = req.body;

        if (!user || !museum || !date || !price) {
            return res.status(400).send('Missing required fields');
        }

        const ticket = new Ticket({ user, museum, date, price });
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(500).send('Error booking ticket: ' + error.message);
    }
});

app.get('/museums', async (req, res) => {
    const museums = await Museum.find();
    res.send(museums);
});//list museum

app.post('/museums/search', async (req, res) => {
    const { query } = req.body;
    const museums = await Museum.find({ name: new RegExp(query, 'i') });
    res.send(museums);
});//search museum by name

app.get('/museums/:id/events', async (req, res) => {
    const events = await Event.find({ museumId: req.params.id });
    res.send(events);
});//for a specific museum

//below is timings routes
app.get('/museums/:id/timings', (req, res) => {
    res.send('Open from 9 AM to 5 PM');
});
app.get('/museums/:id/charges', (req, res) => {
    const charges = {
        adult: 20,
        child: 10,
        senior: 15
    };
    res.send(charges);
});//charges routes

app.get('/museums/:id/timeslots', (req, res) => {
    const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM'];
    res.send(timeSlots);
});//fetch available time slots

app.get('/museums/:id/discounts', (req, res) => {
    const discounts = { student: 10, group: 15 };
    res.send(discounts);
});//fetch available discounts

app.get('/museums/:id/directions', (req, res) => {
    res.send('Directions to the museum...');
});//get user direction

app.get('/users/:id/recommendations', (req, res) => {
    const recommendations = ['Exhibition A', 'Exhibition B'];
    res.send(recommendations);
});//recommendations

//below email confirmation
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
        user: 'ARISHNBPC@GMAIL.COM',
        pass: 'uoomhvoeddqenoaj' 
    }
});

app.post('/tickets/:id/confirm', async (req, res) => {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).send('Email is required');
    }

    try {
        await transporter.sendMail({
            from: 'ARISHNBPC@GMAIL.COM',
            to: userEmail,
            subject: 'Booking Confirmation',
            text: 'Your ticket has been confirmed!'
        });
        res.send('Confirmation sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send confirmation');
    }
});




const PORT = process.env.PORT || 3038
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
