define(function () {
    return class Collection {
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
})
