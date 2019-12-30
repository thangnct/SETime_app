export function convertDatatoFormData(data) {
    const formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append([item], data[item]);
    })
    return formData;
}