//movies collection
let serverlessMovies = [{
    "id": 1,
    "title": "Forrest Gump",
    "duration": "142",
    "director": "Zemekis",
    "year": 1994,
    "img_src": "forrest.jpg"
},{
    "id": 2,
    "title": "Terminator",
    "duration": "150",
    "director": "Cameron",
    "year": 1992,
    "img_src": "terminator.jpg"
}];
export class Collection {
    constructor (model,  url, children) {
        this.Model = model; // model class 
        this.children = children; // models stored in collection
        this.url = url; // url to get data
    }
    fetch () { // Get data from server // 1
    //    return fetch(this.url).then((data)=> data.json()).then((result) => {
    //         //2
    //         this.children = result.map((movie) => {
    //             return new this.Model(movie)
    //         });
    //         return this.children;
    //    });
        return Promise.resolve(serverlessMovies).then((result) => {
            //2
            this.children = result.map((movie) => {
                return new this.Model(movie)
            });
            return this.children;
        });
    }

    create(movie) {
        let p = new Promise(function (resolve, reject) {
            if (!movie) {
                reject(new Error())
            } else {
                serverlessMovies.push(movie);
                resolve(movie);
            }
        });
        return p;
    }

    add (item) {
        this.children.push(item)
    }
    get () {
        return this.children;
    }
}
//CRUD - create read update delete
//HTTP
//POST GET PUT(PATCH) DELETE

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