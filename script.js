document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('quote-container');
    const characterContainer = document.getElementById('character-container');
    const episodeContainer = document.getElementById('episode-container');
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        fetchQuotes(searchValue);
    });

    fetchQuotes();

    function fetchQuotes(searchValue = '') {
        const quoteApiUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=100';
        let quoteUrl = quoteApiUrl;

        if (searchValue !== '') {
            quoteUrl += `&character=${searchValue}`;
        }

        fetch(quoteUrl)
            .then(response => response.json())
            .then(data => {
                quoteContainer.innerHTML = ''; 

                if (data.length === 0) {
                    quoteContainer.innerHTML = '<p>No quotes found for this character.</p>';
                    return;
                }

                data.forEach(quote => {
                    const quoteDiv = document.createElement('div');
                    quoteDiv.classList.add('quote');

                    const img = document.createElement('img');
                    img.src = quote.image;
                    img.alt = quote.character;

                    const pCharacter = document.createElement('p');
                    pCharacter.textContent = quote.character;

                    const pQuote = document.createElement('p');
                    pQuote.textContent = `"${quote.quote}"`;

                    const pLink = document.createElement('a');
                    pLink.href = quote.characterDirection === 'Left' ? 'https://simpsons.fandom.com/wiki/' + quote.character.replace(/\s/g, '_') : '#';

                    quoteDiv.appendChild(img);
                    quoteDiv.appendChild(pCharacter);
                    quoteDiv.appendChild(pQuote);
                    quoteDiv.appendChild(pLink);

                    quoteContainer.appendChild(quoteDiv);
                });
            })
            .catch(error => console.error('Error fetching quotes:', error));
    }

    
    fetch('https://thesimpsonsquoteapi.glitch.me/characters')
        .then(response => response.json())
        .then(data => {
            characterContainer.innerHTML = ''; 

            data.slice(0, 3).forEach(character => { 
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `${character.name} - ${character.bio}`;
                characterContainer.appendChild(characterDiv);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));

    
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?character=ho')
        .then(response => response.json())
        .then(data => {
         
            const quote = data[0];
            const quoteDiv = document.createElement('div');
            quoteDiv.textContent = `"${quote.quote}" - ${quote.character}`;
            quoteContainer.appendChild(quoteDiv);
        })
        .catch(error => console.error('Error fetching quotes from Homer or Milhouse:', error));
});
