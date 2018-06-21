let templates = {
    movieHTML: `<div class="image-wrapper"></div>
                <div class="image-wrapper--small"></div>
                <span>Title: <%= title %> Year: <%= year %></span> <button class="remove-item-button">X</button>`,
    //
    movieListHTML: `Movie List <% for(let i = 0; i < children.length; i++) { %>
                                    <%= children[0]['year'] %> 
                                <% } %>`
}

