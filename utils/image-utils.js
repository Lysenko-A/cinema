function loadImage(url, callback) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.onload = function (){
            resolve(image)
        }

        image.onerror = function () {
            reject(new Error('wrong url'))
        }
        image.src = url;
    });
        
        /*
         * pattern callback;
        let image = new Image();
        image.onload = function () {
            callback(null, image);
        }

        image.onerror = function () {
            callback(new Error('wrong url'))
        }
        image.src = url;*/
}

export default loadImage;