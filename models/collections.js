//movies collection
let serverlessMovies = [{
    "id": 1,
    "title": "Forrest Gump",
    "duration": "142",
    "director": "Zemekis",
    "year": 1994,
    "small_img_urls": ["forrest.jpg", "forrest.jpg", "forrest.jpg"],
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
    /**
     * Represents a book.
     * @method
     * @param {number} id -id of the movie.
     */
    delete (id) {
        let index = serverlessMovies.findIndex(function (item) {
            return item.id === id;
        });
        let p = new Promise(function(resolve, reject){
            if (index !== -1) {
                serverlessMovies.splice(index, 1);
                resolve('OK')
            } else {
                reject(new Error('something wrong'))
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