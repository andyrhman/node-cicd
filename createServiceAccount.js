import fs from 'fs';

const createServiceAccountFile = () => {
    try {
        const path = './src/test.json';
        const serviceAccountKey = process.env.GCP_SA_KEY;

        if (!serviceAccountKey) {
            throw new Error('Environment variable GCP_SA_KEY is not set');
        }

        const serviceAccount = JSON.parse(serviceAccountKey);
        fs.mkdirSync('./src', { recursive: true });
        fs.writeFileSync(path, JSON.stringify(serviceAccount, null, 2));

        console.log(`Service account file created successfully at: ${path}`);
    } catch (error) {
        console.error(`Error creating service account file: ${error.message}`);
        process.exit(1);
    }
};

const logServiceAccount = () => {
    const path = './src/test.json';

    try {
        const jsonContent = JSON.parse(fs.readFileSync(path, 'utf8'));

        // Remove sensitive data
        delete jsonContent.private_key;

        console.log('Sanitized JSON Content:');
        console.log(JSON.stringify(jsonContent, null, 2));
    } catch (error) {
        console.error(`Failed to log JSON content: ${error.message}`);
        process.exit(1);
    }
};

createServiceAccountFile();
logServiceAccount();


