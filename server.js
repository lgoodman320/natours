import app from './app.js';
const PORT = process.env.PORT || 3000;

// START SERVER
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});