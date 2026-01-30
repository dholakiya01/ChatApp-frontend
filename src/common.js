export const capitalizeFirstLetter =(string)=> {
    if (!string) return '';
    return string.replace(/\b\w/g, char => char.toUpperCase());
}