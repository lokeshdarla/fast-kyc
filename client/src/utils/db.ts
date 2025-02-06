import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    if (!process.env.NEXT_PUBLIC_MONGO_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {});

    connection.isConnected = db.connection.readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export default dbConnect;
