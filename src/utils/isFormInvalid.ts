export const isFormInvalid = (errors: any) => {
    if(Object.keys(errors).length > 0) return true
    return false
}