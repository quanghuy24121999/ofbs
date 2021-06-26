export function formatDate(dateInput) {
    let date = new Date(dateInput);
    let month = (
        (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
    )
    return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/'
        + month + '/' + date.getFullYear();
}