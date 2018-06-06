define(function (){
    return class Model {
        constructor (options) {
            //this._id = generateId();
            for (let key in options) {
                //options.hasOwnProperty(key)
                if (Object.prototype.hasOwnProperty.call(options, key) === true) {
                    this[key] = options[key];
                }
            }
        }  
        save () {
            //save data to server
            //server.update(this.id);
        }
    }
})

