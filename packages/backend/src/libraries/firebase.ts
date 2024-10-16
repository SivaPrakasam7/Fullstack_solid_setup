import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require(process.env.SERVICE_KEY_PATH!);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { getAuth };
