import '../css/style.css';
import '../css/reset.css';

const httpRequest = new XMLHttpRequest();
const autoFillArea = document.getElementById('autofill--area');
const suggestionList = document.getElementById('suggestion--list-item');

httpRequest.open("GET", "../../assets/listeDeMot.txt");

const showSuggestion = () => {

    autoFillArea.oninput = () => {

    }
}

const onSuggestionClick = () => {

    const res = httpRequest.response.split("\n\r");


    if (autoFillArea.ariaValueMax.length >= 2) {
        const filtredSuggestion = res.filter(el => el.startsWith(autoFillArea.value)).slice(0, 10);
    }
}