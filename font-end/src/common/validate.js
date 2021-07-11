export function validatePhoneNumber(number) {
    let patt = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    return patt.test(number);
}

export function validatePassword(password) {
    let patt = new RegExp(/^[^\s]{3,32}$/);
    return patt.test(password);
}

// ^(?=.*\d).{8,}$
export function validateUsername(username) {
    let patt = new RegExp(/^(?=.*).{1,100}$/);
    return patt.test(username);
}