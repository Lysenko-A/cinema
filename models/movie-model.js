define(['Model'], function (Model){
    return class MovieModel extends Model {
        setTitle(title) {
            this.title = title;
        }
        validate () {
            return true;
        }
    }
})
