
//בדיקת תקינות מייל
const isValidEmail = (email) => {
    // אותו רעיון כמו בשרת: דומיין תקין, סיומת של 2 אותיות לפחות, ובלי נקודות כפולות
    const emailRegex = /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?\.)+\p{L}{2,}$/u;
    return emailRegex.test(email.trim());
}
//בדיקת תקינות סיסמא
const isValidPassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 6 && hasLetter && hasNumber;
}
//בדיקת תקינות שם
const isValidName = (name) => {
    const clean = name.trim();
    return clean.length >= 2 && clean.length <= 50;
}
//בדיקת תקינות טלפון
const isValidPhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, "");
        // נייד (10 ספרות, 05X) או נייח (9 ספרות, למשל 02/03/04/08/09), גם עם 972 בהתחלה. אותו כלל כמו בשרת
        const phoneRegex = /^(?:0\d{8,9}|972\d{8,9})$/;
        return phoneRegex.test(cleanPhone);
}
export default {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidPhone
}