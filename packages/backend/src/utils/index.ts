export const generateUserId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16);
};

export const generateSecretKey = () => {
    return Math.random().toString(36).substring(2, 12);
};
