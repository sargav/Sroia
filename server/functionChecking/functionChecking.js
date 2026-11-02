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
        // נייד (10 ספרות, 05X) או נייח (9 ספרות, למשל 02/03/04/08/09), גם עם 972 בהתחלה
        const phoneRegex = /^(?:0\d{8,9}|972\d{8,9})$/;
        return phoneRegex.test(cleanPhone);
}
//בדיקת תקינות שם משתמש: 3-30 תווים, אותיות באנגלית, מספרים, נקודה, מקף וקו תחתון - בלי רווחים
const isValidManName = (manName) => {
    return /^[a-zA-Z0-9._-]{3,30}$/.test(manName.trim());
}
module.exports = {
    isValidManName,
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidPhone
}