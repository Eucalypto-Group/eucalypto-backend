import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    google: {
      projectID: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: decodeURIComponent(process.env.GOOGLE_PRIVATE_KEY),
      },
    },
    redis: {
      url: process.env.REDIS_URL,
      url1: process.env.REDIS_URL1,
      url2: process.env.REDIS_URL2,
      url3: process.env.REDIS_URL3,
      cacheTimeOut: process.env.REDIS_CACHE_TIME_SECONDS,
    },
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    front: {
      host: process.env.FRONT_HOST,
    },
    linkedin: {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
  };
});
