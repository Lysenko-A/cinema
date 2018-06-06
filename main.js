require.config({
    paths: {
        Model: 'models/base-model',
        MovieModel: 'models/movie-model',
        Collection: 'models/base-collection',
        MovieCollection: 'models/movie-collection',
        app: 'app'
    }
});
requirejs(['app'])