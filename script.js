// --- CONFIGURAÇÃO ---
// Para adicionar, remover ou editar secretarias, altere esta lista.
// 'name' é o que aparece na tela. 'id' é o que vai no link.
const secretarias = [
    { name: 'Saúde', id: 'saude' },
    { name: 'Educação, Cultura e Esporte', id: 'educacao' },
    { name: 'Desenvolvimento Econômico', id: 'desenvolvimento_economico' },
    { name: 'Infraestrutura e Mobilidade', id: 'infraestrutura' },
    { name: 'Assistência Social', id: 'assistencia_social' },
    { name: 'Comunicação', id: 'comunicacao' },
    { name: 'Desenvolvimento Rural', id: 'desenvolvimento_rural' },
    { name: 'Governo', id: 'governo' },
    { name: 'Casa Civil', id: 'casa_civil' },
    { name: 'Segurança Pública', id: 'seguranca_publica' },
    // Adicione mais secretarias aqui seguindo o mesmo formato
];

// --- APLICAÇÃO ---
const baseUrlInput = document.getElementById('baseUrl');
const campaignNameInput = document.getElementById('campaignName');
const generateBtn = document.getElementById('generateBtn');
const resultsContainer = document.getElementById('resultsContainer');

function generateLinks() {
    const baseUrl = baseUrlInput.value.trim();
    const campaignName = campaignNameInput.value.trim();

    if (!baseUrl || !campaignName) {
        alert('Por favor, preencha o link do post e o nome da campanha.');
        return;
    }

    resultsContainer.innerHTML = ''; // Limpa resultados antigos

    secretarias.forEach(secretaria => {
        const utmContent = secretaria.id;
        const utmSource = 'whatsapp';
        const utmMedium = 'grupo_secretaria';

        // Constrói o link final com os parâmetros UTM
        const finalUrl = `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${campaignName}&utm_content=${utmContent}`;

        // Cria o HTML para cada item da lista
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <span class="secretaria-name">${secretaria.name}</span>
            <span class="generated-link">${finalUrl}</span>
            <button class="copy-btn">Copiar</button>
        `;
        
        resultsContainer.appendChild(resultItem);
    });
}

// Função para copiar o link
resultsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-btn')) {
        const button = e.target;
        const linkToCopy = button.previousElementSibling.textContent;

        navigator.clipboard.writeText(linkToCopy).then(() => {
            // Feedback visual para o usuário
            button.textContent = 'Copiado!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copiar';
                button.classList.remove('copied');
            }, 2000); // Volta ao normal depois de 2 segundos
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
            alert('Não foi possível copiar o link.');
        });
    }
});

// Event Listeners
generateBtn.addEventListener('click', generateLinks);
// Permite gerar links pressionando Enter em qualquer um dos campos de texto
campaignNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        generateLinks();
    }
});