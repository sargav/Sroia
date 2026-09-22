const validator = require("validator");

//בדיקת תקינות מייל
const isValidEmail = (email) => {
    return validator.isEmail(email.trim());
}
//בדיקת תקינות סיסמא
const isValidPassword = (password) => {
    const hasLetter = validator.matches(password, /[a-zA-Z]/);
    const hasNumber = validator.matches(password, /\d/);
    return validator.isLength(password, { min: 6 }) && hasLetter && hasNumber;
}
//בדיקת תקינות שם
const isValidName = (name) => {
    return validator.isLength(name, { min: 2, max: 50 });
}
//בדיקת תקינות טלפון
const isValidPhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, "");
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(cleanPhone);
}
module.exports = {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidPhone
}