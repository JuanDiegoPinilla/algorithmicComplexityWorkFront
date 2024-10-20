document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/AlgorithmicComplexity/read', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.text();
    })
    .then(data => {
        localStorage.setItem('fileContent', data);
        window.location.href = 'content.html';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Error al leer el archivo.';
    });
});
