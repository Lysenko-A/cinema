import { Model, MovieModel } from './models/models.js'
import { Collection, MovieCollection} from './models/collections.js'
import loadImage from './utils/image-utils.js'

var routes = [
    {
        id: "movies",
        url: '/movies',
        init: function () {
            
        }
    }
]

class View {
    constructor(options/*el, model, className, tagName*/) {
        let tag = options.tagName || 'div';
        if (options.el) {
            this.el = options.el;
        } else {
            this.el = document.createElement(tag);
        }
        this.model = options.model;

        if (options.className) {
            this.className = options.className;
            this.el.classList.add(this.className);
        }
    }
    destroy() {
        this.deleteEvents()
        this.el.parentNode.removeChild(this.el);
    }
    deleteEvents() {

    }
}

class MovieListView extends View {
    constructor(options) {
        super(options);
        this.children = options.children || [];
        this.collection = options.collection;
        document.querySelector('#new-movie-button').addEventListener('click', function (e) {
            const nameInput = document.querySelector('[name="name"]');
            const yearInput = document.querySelector('[name="year"]')
            this.collection.create({
                "id": 3,
                "title": nameInput.value,
                "duration": "142",
                "director": "Zemekis",
                "year": yearInput.value,
                "img_src": "forrest.jpg"
            }).then((movie) => this.addMovie(new MovieView({
                model: movie,
                className: "movie-item",
                collection: this.collection
            }))).catch((e) => console.log(e))
        }.bind(this));
    }
    addMovie(movie) {
        this.children.push(movie);
        this.el.appendChild(movie.render().el);
        //add new movie to the children and render it
    }
    render() {
        if (this.children.length > 0) {
            let renderWithParams = _.template(templates.movieListHTML);
            this.children.forEach((movieView) => {
                this.el.appendChild(movieView.render().el);
            });

        } else {
            this.el.innerText = "No movies";
        }
        return this;
    }
}
class MovieView extends View {
    constructor (options) {
        super(options);
        this.collection = options.collection;
    }
    render() {
        /* pattern promise */
        var renderWithParams = _.template(templates.movieHTML);
        this.el.innerHTML = renderWithParams({
            title: this.model.title,
            year: this.model.year
        });
        this.el.querySelector(".remove-item-button").onclick = function (e) {
            let view = this;
            this.collection.delete(this.model.id).then(function (res) {
                view.destroy();
            }).catch(function (err) {
                console.log(err)
            })
        }.bind(this)

        loadImage(this.model.img_src).then((img) => {
            this.el.querySelector('.image-wrapper').appendChild(img);
        }).catch(function (err) {
            console.log(err)
        });

        // pattern callback;
        // var renderWithParams = _.template(templates.movieHTML);
        // this.el.innerHTML = renderWithParams({
        //     title: this.model.title,
        //     year: this.model.year
        // });
        // this.el.querySelector(".remove-item-button").onclick = function (e) {
        //     let view = this;
        //     this.collection.delete(this.model.id).then(function (res) {
        //         view.destroy();
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
        // }.bind(this)
        // loadImage(this.model.img_src, function (err, img) {
        //     if (!err) {
        //         this.el.querySelector('.image-wrapper').appendChild(img);
        //     }
        // }.bind(this))
        

      
    
        return this;
    }
}

// 1. Создать экземляр коллекции MovieCollection

let moviesCollection = new MovieCollection(MovieModel, 'data.json');

// 2. Вызываем метод fetch 


moviesCollection.fetch().then(function (result) {
    //3
    //complex example
    let movieListView = new MovieListView({
        el: document.querySelector('#movie-list'),
        collection: moviesCollection,
        className: 'list-container',
        children: result.map(function (movie) {
            return new MovieView({
                model: movie,
                className: "movie-item",
                collection: moviesCollection
            })
        })
    });
    movieListView.render();
});


// let nav = document.querySelector('nav');

// window.addEventListener("hashchange", function (e) {
//    console.log(location.hash)
// });


let nav = document.querySelector('nav');
nav.addEventListener('click', function (e){
    e.preventDefault();
    if(e.target.classList.contains('nav')) {
        var stateObj = { foo:  e.target.href };
        history.pushState(stateObj, e.target.href, e.target.href);
        console.log(stateObj.foo);
    }
})
window.addEventListener('popstate', function (e) {
   console.log(e.state.foo);
})

// function renderContent (data) {
//     var view = document.getElementById('view');
//     view.innerHTML = data;
// }

// window.addEventListener("hashchange", function (e) {
//    renderContent(location.hash)
// });