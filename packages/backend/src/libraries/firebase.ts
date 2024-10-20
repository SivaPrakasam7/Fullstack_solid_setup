import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require(process.env.SERVICE_KEY_PATH!);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export { getAuth };
