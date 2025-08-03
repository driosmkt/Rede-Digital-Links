// --- CONFIGURAÇÃO ---
// Lista completa e oficial de secretarias e autarquias.
const secretarias = [
    { name: 'Saúde', id: 'saude' },
    { name: 'Educação, Cultura e Esporte', id: 'educacao_cultura_esporte' },
    { name: 'Desenvolvimento Econômico, Turismo e Inovação', id: 'desenvolvimento_economico' },
    { name: 'Infraestrutura e Mobilidade', id: 'infraestrutura_mobilidade' },
    { name: 'Assistência Social e Combate à Fome', id: 'assistencia_social' },
    { name: 'Comunicação', id: 'comunicacao' },
    { name: 'Desenvolvimento Rural', id: 'desenvolvimento_rural' },
    { name: 'Serviços Públicos e Defesa Civil', id: 'servicos_publicos' },
    { name: 'Governo', id: 'governo' },
    { name: 'Desenvolvimento Urbano, Habitação e Sustentabilidade', id: 'desenvolvimento_urbano' },
    { name: 'Casa Civil', id: 'casa_civil' },
    { name: 'Planejamento, Gestão e Finanças', id: 'planejamento_financas' },
    { name: 'Segurança Pública', id: 'seguranca_publica' },
    { name: 'Licitações e Contratos', id: 'licitacoes_contratos' },
    { name: 'Receitas Municipais', id: 'receitas_municipais' },
    { name: 'Procuradoria-Geral', id: 'procuradoria_geral' },
    { name: 'Controladoria-Geral', id: 'controladoria_geral' },
    { name: 'Ammpla', id: 'ammpla' },
    { name: 'Autarquia 1', id: 'autarquia_1' },
    { name: 'Autarquia 2', id: 'autarquia_2' }
];

// --- FUNÇÃO DE LIMPEZA ---
function sanitizeCampaignName(name) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return name.toString().toLowerCase().replace(/\s+/g, '_').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '_').replace(/^-+/, '').replace(/-+$/, '')
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

    const campaignName = sanitizeCampaignName(rawCampaignName);
    resultsContainer.innerHTML = ''; 

    secretarias.forEach(secretaria => {
        const utmContent = secretaria.id;
        const utmSource = 'whatsapp';
        const utmMedium = 'grupo_secretaria';
        const utmTerm = contentType;

        // ETAPA 1: Monta o link final do Instagram com todos os parâmetros UTM
        const destinationUrlWithUtms = `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${campaignName}&utm_content=${utmContent}&utm_term=${utmTerm}`;
        
        // ETAPA 2: Codifica o link de destino para que ele possa ser passado como um parâmetro de URL sem quebrar
        const encodedDestination = encodeURIComponent(destinationUrlWithUtms);
        
        // ETAPA 3: Monta a URL da sua página de redirecionamento, passando o link codificado como o parâmetro "destino"
        const finalUrl = `https://driosmkt.github.io/RedeDigital/redirecionando.html?destino=${encodedDestination}`;

        // Cria o HTML para cada item da lista (sem alterações aqui)
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

// O restante do código permanece o mesmo
resultsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('copy-btn')) {
        const button = e.target;
        const linkToCopy = button.previousElementSibling.textContent;

        navigator.clipboard.writeText(linkToCopy).then(() => {
            button.textContent = 'Copiado!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copiar';
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
            alert('Não foi possível copiar o link.');
        });
    }
});

generateBtn.addEventListener('click', generateLinks);
