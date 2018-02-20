let environmentCache = null;

export const environmentReader = new Promise((resolve, reject) => {
    console.log('Inside environmentReader of kfhub_lib');
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './assets/config/env.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            environmentCache = JSON.parse(xhr.responseText)
            resolve(environmentCache);
        } else {
            reject("Cannot load configuration...");
        }
    };
    xhr.send();
});

export const environment = () => {
    return environmentCache;
}
