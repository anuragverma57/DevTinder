const SAFE_FIELDS = ["firstName", "lastName", "emailId", "age", "gender", "photoURL", "about", "skills"]
function sanitizeUser(obj, safeFields) {
    const plainObj = obj.toObject();
    const user = Object.fromEntries(
        Object.entries(plainObj).filter(([key]) => SAFE_FIELDS.includes(key))
    );
    return user;
}

module.exports = { sanitizeUser }