//movies collection
export class Collection {
    constructor (model,  url, children) {
        this.Model = model; // model class 
        this.children = children; // models stored in collection
        this.url = url; // url to get data
    }
    fetch () { // Get data from server // 1
       return fetch(this.url).then((data)=> data.json()).then((result) => {
            //2
            this.children = result.map((movie) => {
                return new this.Model(movie)
            });
            return this.children;
       });
    }

    add (item) {
        this.children.push(item)
    }
    get () {
        return this.children;
    }
}

export class MovieCollection extends Collection {
    
}

export class Model {
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

export class MovieModel extends Model {
    setTitle(title) {
        this.title = title;
    }
    validate () {
        return true;
    }
}