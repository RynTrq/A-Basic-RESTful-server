const app = require('./src/app');
const connectDB = require('./src/db/db');

async function start() {
    await connectDB();
    const port = process.env.PORT || 3005;
    return app.listen(port, () => console.log('Server is running on port ' + port + '.'));
}

if (require.main === module) {
    start().catch(error => {
        console.error('Unable to start the notes API:', error.message);
        process.exitCode = 1;
    });
}
module.exports = { start };
