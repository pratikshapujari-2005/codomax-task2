const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data file paths
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const BLOGS_FILE = path.join(__dirname, 'data', 'blogs.json');

// Default Demo Blogs Seed Data
const DEFAULT_BLOGS = [
    {
        id: 1700000001,
        title: "Crafting Spaces That Inspire Calm and Creativity",
        content: "Modern architectural principles focus on natural light, tactile materials, and organic spatial flow. By paring down visual clutter and introducing warm, raw textures like oak and linen, interior design transforms from mere aesthetic layout into an immersive sensory retreat.",
        author: "Elena Rostova",
        tag: "Architecture & Design",
        createdAt: "Oct 24, 2026"
    },
    {
        id: 1700000002,
        title: "The Art of Slow Journalism in a Fast-Paced Digital Era",
        content: "In an era dominated by clickbait headlines and rapid news cycles, slow journalism offers deep research, thoughtful reflection, and narrative richness. Readers are increasingly seeking substance over speed, giving rise to independent newsletters and long-form publications.",
        author: "Marcus Chen",
        tag: "Publishing",
        createdAt: "Oct 22, 2026"
    },
    {
        id: 1700000003,
        title: "Building Scalable Web Apps with Micro-Frontends",
        content: "As modern web platforms grow, monolithic frontend codebases can become difficult to maintain across engineering teams. Decoupling applications into micro-frontends allows teams to deploy independently, choose optimal tech stacks, and iterate much faster.",
        author: "Pratiksha Pujari",
        tag: "Technology",
        createdAt: "Oct 20, 2026"
    },
    {
        id: 1700000004,
        title: "Savory Journal: Seasonal Cooking and Mindful Eating",
        content: "Exploring seasonal produce is one of the simplest ways to elevate daily home cooking. Autumn root vegetables, warm spices, and slow-simmered broths bring comforting aromas to the kitchen while honoring local agricultural cycles.",
        author: "Amara Thorne",
        tag: "Food & Lifestyle",
        createdAt: "Oct 18, 2026"
    }
];

// Helper Functions
const readData = (filePath, defaultData = []) => {
    if (!fs.existsSync(filePath)) {
        writeData(filePath, defaultData);
        return defaultData;
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(data || '[]');
        if (parsed.length === 0 && defaultData.length > 0) {
            writeData(filePath, defaultData);
            return defaultData;
        }
        return parsed;
    } catch (err) {
        return defaultData;
    }
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// --- REST API ENDPOINTS ---

// 1. User Registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const users = readData(USERS_FILE);
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const newUser = { id: Date.now(), username, email: email.toLowerCase(), password };
    users.push(newUser);
    writeData(USERS_FILE, users);

    res.status(201).json({ 
        success: true, 
        message: 'Registration successful! You are now logged in.',
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
});

// 2. User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const users = readData(USERS_FILE);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.json({ 
        success: true, 
        message: 'Login successful!', 
        user: { id: user.id, username: user.username, email: user.email } 
    });
});

// 3. Get All Blogs
app.get('/api/blogs', (req, res) => {
    const blogs = readData(BLOGS_FILE, DEFAULT_BLOGS);
    res.json({ success: true, blogs });
});

// 4. Create Blog Post
app.post('/api/blogs', (req, res) => {
    const { title, content, author, tag } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ success: false, message: 'Title, content, and author are required.' });
    }

    const blogs = readData(BLOGS_FILE, DEFAULT_BLOGS);
    const newBlog = {
        id: Date.now(),
        title,
        content,
        author,
        tag: tag || 'General',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    blogs.unshift(newBlog);
    writeData(BLOGS_FILE, blogs);

    res.status(201).json({ success: true, message: 'Blog posted successfully!', blog: newBlog });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Velox Server running at http://localhost:${PORT}`);
});