function getCharacters(done) {
    const results = fetch("https://thesimpsonsquoteapi.glitch.me/quotes");

    results.then(respondse => Response.json())
    .then(data =>{
        done(data)
    })
}
getCharacters(data => {
    data.results.forEach(personaje => {
        const article = document.createRange().createContextualFragment(/*html*/)
        
});