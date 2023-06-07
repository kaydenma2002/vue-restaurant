const localStorageImport = function (key, value) {
    localStorage.setItem(key, value)
}
const localStorageExport = function (key) {
    return localStorage.getItem(key)
}
const localStorageRemove = function (key) {
    return localStorage.removeItem(key)
}
export {localStorageImport,localStorageExport,localStorageRemove}