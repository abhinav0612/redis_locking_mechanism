import { createClient } from 'redis';

// Use the Render environment variable, or fallback to local for development
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('✅ Connected to Redis successfully');
    } catch (error) {
        console.error('❌ Redis connection failed:', error);
        // Important for Render: if Redis fails, we want the app to exit 
        // so Render knows the deploy wasn't successful.
        process.exit(1); 
    }
};

export default redisClient;
