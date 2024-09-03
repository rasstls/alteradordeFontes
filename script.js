document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("text-input");
    const fontSelector = document.getElementById("font-selector");
    const textOutput = document.getElementById("text-output");
    const orientationSelector = document.querySelectorAll('input[name="orientation"]');
    const caseSelector = document.querySelectorAll('input[name="text-case"]');
    const copyButton = document.getElementById("copy-button");
    const fontSearch = document.getElementById("font-search"); // Novo campo de busca


    function updateText() {
        const selectedFont = fontSelector.value;
        let text = textInput.value;
        let selectedOrientation = 'horizontal';
        let selectedCase = '';
        let isBold = false;

        // Verifica qual opção de orientação está selecionada
        orientationSelector.forEach((radio) => {
            if (radio.checked) {
                selectedOrientation = radio.value;
            }
        });

        // Verifica qual opção de maiúsculo/minúsculo está selecionada
        caseSelector.forEach((radio) => {
            if (radio.checked) {
                selectedCase = radio.value;
            }
        });

        // Verifica se o texto deve estar em negrito
        if (document.querySelector('input[name="orientation"][value="bold"]').checked) {
            isBold = true;
        }

        // Aplica as transformações ao texto
        textOutput.style.fontFamily = selectedFont;
        textOutput.style.fontWeight = isBold ? 'bold' : 'normal';

        if (selectedCase === 'uppercase') {
            text = text.toUpperCase();
        } else if (selectedCase === 'lowercase') {
            text = text.toLowerCase();
        }

        if (selectedOrientation === 'vertical') {
            textOutput.style.writingMode = 'vertical-rl';
            textOutput.style.textOrientation = 'upright';
            textOutput.style.transform = 'none';
        } else if (selectedOrientation === 'upside-down') {
            textOutput.style.writingMode = 'horizontal-tb';
            textOutput.style.textOrientation = 'mixed';
            textOutput.style.transform = 'rotate(180deg)';
        } else {
            textOutput.style.writingMode = 'horizontal-tb';
            textOutput.style.textOrientation = 'mixed';
            textOutput.style.transform = 'none';
        }

        textOutput.textContent = text;
    }

    function copyText() {
        const text = textOutput.textContent;
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => alert("Texto copiado para a área de transferência!"))
                .catch(err => alert("Falha ao copiar texto: " + err));
        }
    }

    // Função para filtrar as fontes no seletor com base na busca
    function filterFonts() {
        const filter = fontSearch.value.toLowerCase();
        const options = fontSelector.getElementsByTagName("option");

        for (let i = 0; i < options.length; i++) {
            const txtValue = options[i].textContent || options[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                options[i].style.display = "";
            } else {
                options[i].style.display = "none";
            }
        }
    }

    textInput.addEventListener("input", updateText);
    fontSelector.addEventListener("change", updateText);
    orientationSelector.forEach((radio) => {
        radio.addEventListener("change", updateText);
    });
    caseSelector.forEach((radio) => {
        radio.addEventListener("change", updateText);
    });
    copyButton.addEventListener("click", copyText);
    fontSearch.addEventListener("input", filterFonts); // Evento para a barra de busca
});
