document.addEventListener("DOMContentLoaded", function () {
    const fileContent = localStorage.getItem('fileContent');
    document.getElementById('fileContent').innerText = fileContent || 'No se encontró contenido.';
    const kmpButton = document.createElement('button');
    kmpButton.innerText = 'Algoritmo KMP';
    kmpButton.id = 'kmpButton';
    document.querySelector('.container').appendChild(kmpButton);
    const bmButton = document.createElement('button');
    bmButton.innerText = 'Algoritmo BM';
    bmButton.id = 'bmButton';
    document.querySelector('.container').appendChild(bmButton);

    const searchArea = document.createElement('div');
    searchArea.id = 'searchArea';
    searchArea.style.display = 'none';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const searchButton = document.createElement('button');
    searchButton.innerText = 'Buscar';

    searchArea.appendChild(searchInput);
    searchArea.appendChild(searchButton);
    document.querySelector('.container').appendChild(searchArea);

    let currentAlgorithm = 'KMP'; 
    kmpButton.addEventListener('click', function () {
        currentAlgorithm = 'KMP'; 
        searchArea.style.display = searchArea.style.display === 'none' ? 'block' : 'none';
    });

    bmButton.addEventListener('click', function () {
        currentAlgorithm = 'BM'; 
        searchArea.style.display = searchArea.style.display === 'none' ? 'block' : 'none';
    });

    
    searchButton.addEventListener('click', function () {
        const pattern = searchInput.value.trim();
        if (!pattern) {
            alert('Por favor, ingresa una palabra, oración o frase para buscar.');
            return;
        }

        const url = currentAlgorithm === 'KMP'
            ? 'http://localhost:8080/AlgorithmicComplexity/search'
            : 'http://localhost:8080/AlgorithmicComplexity/searchBM';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ pattern })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            const { count, positions, duration } = data;
            displaySearchResults(pattern, count, positions, duration);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al realizar la búsqueda.');
        });
    });
});

function displaySearchResults(pattern, count, positions, duration) {
    const contentElement = document.getElementById('fileContent');
    let content = contentElement.innerText;

    const regex = new RegExp(`(${pattern})`, 'gi');
    content = content.replace(regex, '<mark>$1</mark>');

    contentElement.innerHTML = content;

    let resultsElement = document.getElementById('searchResults');
    if (!resultsElement) {
        resultsElement = document.createElement('div');
        resultsElement.id = 'searchResults';
        document.querySelector('.container').appendChild(resultsElement);
    }

    const results = `La palabra "${pattern}" se encontró ${count} veces.<br>Tiempo de ejecución: ${duration} ms.`;
    resultsElement.innerHTML = results;
}
