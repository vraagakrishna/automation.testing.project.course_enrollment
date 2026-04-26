function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing environment variable: ${name}`);
    return value;
}

export const env = {
    adminEmail: getEnv('ADMIN_EMAIL'),
    adminPassword: getEnv('ADMIN_PASSWORD'),
    userEmail: getEnv('USER_EMAIL'),
    userPassword: getEnv('USER_PASSWORD'),
};
