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

export function validateCapacity(size) {
    let patt = new RegExp(/^(?=.*\d).{1,10}$/);
    return patt.test(size);
}

export function validateItemCart(number) {
    let patt = new RegExp(/^(?=.*\d).{1,5}$/);
    return patt.test(number);
}

export function validateEmpty(text) {
    if (text !== '') {  
        return true;
    } else {
        return false;
    }
}

export function validateFeedback(feedback) {
    let patt = new RegExp(/^(?=.*).{1,250}$/);
    return patt.test(feedback);
}

export function validateTextSearch(text) {
    let patt = new RegExp(/^(?=.*).{0,100}$/);
    return patt.test(text);
}