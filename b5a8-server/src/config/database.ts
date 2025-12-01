import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
    try {
        const mongoURI = process.env.DATABASE_URL;

        if (!mongoURI) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }

        await mongoose.connect(mongoURI);

        console.log('✅ MongoDB connected successfully');

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
