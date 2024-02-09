// utils/dbConnect.js

import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    // Check if we have a connection to the database or if it's currently
    // connecting or disconnecting (in which case we don't want to initiate a new connection)
    if (connection.isConnected) {
        return;
    }

    // Use new database connection
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Check if connection is successful
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected ? 'Database Connected' : 'db connection failed');
}

export default dbConnect;