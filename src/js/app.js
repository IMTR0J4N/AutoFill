import '../css/style.css';
import '../css/reset.css';

const httpRequest = new XMLHttpRequest();
const autoFillArea = document.getElementById('autofill--area');
const suggestionList = document.getElementById('suggestion--list-item');

let lastSuggestionClicked;

autoFillArea.value = null;

httpRequest.open("GET", "../../assets/listeDeMot.txt");

httpRequest.onload = () => {
    
    showSuggestion()
}

httpRequest.send()

const showSuggestion = () => {
    
    autoFillArea.addEventListener('input', () => {
        isUserTyping(onSuggestionClick, autoFillArea);
    })
}

const onSuggestionClick = () => {   
    
    const res = httpRequest.response.split("\r\n");

    if (autoFillArea.value.length >= 2 && lastSuggestionClicked !== autoFillArea.value) {

        const filtredSuggestion = res.filter(el => el.startsWith(autoFillArea.value.toLowerCase())).slice(0, 10);
        
        if (filtredSuggestion.length === 0) {
            const errorLi = document.createElement('li');

            errorLi.innerText = `Aucune suggestion disponible`;
            errorLi.classList.add('disabled');

            suggestionList.appendChild(errorLi);
        } else {
            for (const suggestion of filtredSuggestion) {
              const newSuggestion = document.createElement("li");

              newSuggestion.innerText = `${
                autoFillArea.value[0].match("^[A-Z]")
                  ? suggestion.replace(
                      suggestion[0],
                      suggestion[0].toUpperCase()
                    )
                  : suggestion
              }`;

              newSuggestion.addEventListener("click", () => {
                autoFillArea.value = newSuggestion.innerText;

                suggestionList.innerHTML = ``;

                isUserTyping(onSuggestionClick, autoFillArea);
                lastSuggestionClicked = autoFillArea.value;
              });

              suggestionList.appendChild(newSuggestion);
            }
        }

    } else {
        suggestionList.innerHTML = ``;
    }
}

const isUserTyping = (f, champ) => {
    const timer = setTimeout(() => {
        f();
    }, 500);

    champ.addEventListener('input', () => {
        suggestionList.innerHTML = ``;
        clearTimeout(timer);
    })
}