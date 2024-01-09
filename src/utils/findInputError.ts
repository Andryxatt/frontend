export function findInputError(errors: any, name: string): any {
 const filtred = Object.keys(errors)
 .filter((key) => key.includes(name))
 .reduce((obj, key) => {
    return Object.assign(obj, { error: errors[key] });
 }, {});
 return filtred
}