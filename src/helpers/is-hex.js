export const isHex = (str) => {
    const re = /[0-9A-Fa-f]{6}/g;
    return re.test(str)
}