// --- CONFIGURAÇÃO ---
// Para adicionar, remover ou editar secretarias, altere esta lista.
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

// --- FUNÇÃO DE LIMPEZA ---
// Converte "Nome da Campanha com Acento" para "nome_da_campanha_com_acento"
function sanitizeCampaignName(name) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return name.toString().toLowerCase()
        .replace(/\s+/g, '-') // substitui espaços por -
        .replace(p, c => b.charAt(a.indexOf(c))) // substitui caracteres especiais
        .replace(/&/g, '-and-') // substitui & por 'and'
        .replace(/[^\w\-]+/g, '') // remove todos os caracteres não-alfanuméricos
        .replace(/\-\-+/g, '-') // substitui múltiplos - por um único -
        .replace(/^-+/, '') // remove - do início do texto
        .replace(/-+$/, '') // remove - do final do texto
}


// --- APLICAÇÃO ---
const baseUrlInput = document.getElementById('baseUrl');
const campaignNameInput = document.getElementById('campaignName');
const contentTypeSelect = document.getElementById('contentType');
const generateBtn = document.getElementById('generateBtn');
const resultsContainer = document.getElementById('resultsContainer');

function generateLinks() {
    const baseUrl = baseUrlInput.value.trim();
    const rawCampaignName = campaignNameInput.value.trim();
    const contentType = contentTypeSelect.value;

    if (!baseUrl || !rawCampaignName || !contentType) {
        alert('Por favor, preencha todos os 3 campos para gerar os links.');
        return;
    }

    // Limpa e padroniza o nome da campanha
    const campaignName = sanitizeCampaignName(rawCampaignName);
    resultsContainer.innerHTML = ''; // Limpa resultados antigos

    secretarias.forEach(secretaria => {
        const utmContent = secretaria.id;
        const utmSource = 'whatsapp';
        const utmMedium = 'grupo_secretaria';
        const utmTerm = contentType; // Novo parâmetro!

        // Constrói o link final com os parâmetros UTM
        const finalUrl = `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${campaignName}&utm_content=${utmContent}&utm_term=${utmTerm}`;

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

// Event Listener para o botão
generateBtn.addEventListener('click', generateLinks);
