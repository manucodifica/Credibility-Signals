    // IDs
const textarea = document.getElementById("digite");
const botao = document.getElementById("analisar");
const resultadoContainer = document.getElementById("resultado");

    // Critérios
const criterios = [
    {
        nome: "Linguagem alarmista",
        descricao: "Frases exageradas ou sensacionalistas podem indicar conteúdo de atenção.",
        func: t => /!!!|alarmante|inacreditável|surpreendente|chocante|imperdível|urgente|não vai acreditar|perigo|alerta|explosivo|exclusivo|impactante|catástrofe|bomba|sensacional|revelação|escândalo|bombástico|dramático|urgentíssimo/i.test(t)
    },
    {
        nome: "Fontes citadas",
        descricao: "O texto cita alguma fonte. Mesmo assim, a confiabilidade precisa ser verificada; a presença de uma fonte não garante que a informação seja verdadeira.",
        func: t => {
            const palavrasFonte = ["fonte:", "de acordo com", "segundo", "estudo", "pesquisa", "dados mostram", "relatório"];
            return palavrasFonte.some(p => t.toLowerCase().includes(p.toLowerCase())) ? "detectada" : "nenhuma";
        }
    },
    {
        nome: "Termos vagos",
        descricao: "Palavras genéricas ou pouco específicas podem reduzir a clareza da informação.",
        func: t => /coisas|muita gente|todo mundo|alguns|varios|certas pessoas|alguma coisa|alguns casos|pessoas dizem|alguns afirmam|alguns relatos/i.test(t)
    },
    {
        nome: "Fato e opinião misturados",
        descricao: "Informações que misturam opinião e fato sem clareza podem confundir o leitor.",
        func: t => /eu acho|parece que|na minha opinião|na minha visão|acredito que|creio que|meu ponto de vista|para mim|eu considero/i.test(t)
    },
    {
        nome: "Clickbait / exagero",
        descricao: "Títulos ou frases chamativas podem indicar conteúdo sensacionalista.",
        func: t => /você não vai acreditar|isso vai te surpreender|imperdível|bomba|revelação|isso vai mudar tudo|segredo revelado/i.test(t)
    },
    {
        nome: "Linguagem emocional",
        descricao: "Frases que apelam diretamente para emoções fortes podem sinalizar manipulação.",
        func: t => /isso revolta|isso assusta|isso preocupa todos|isso vai destruir|isso ameaça o futuro|isso deixa todos chocados|isso deixa você furioso/i.test(t)
    },
    {
        nome: "Pseudociência",
        descricao: "Afirmações científicas sem fontes ou estudos claros podem ser enganosas.",
        func: t => /cura milagrosa|tratamento secreto|remédio natural comprovado|cientificamente comprovado sem estudos|método infalível|comprovado sem pesquisa/i.test(t)
    },
    {
        nome: "Dados vagos",
        descricao: "Números sem contexto ou porcentagem clara podem ser enganosos.",
        func: t => /cresceu muito|aumentou bastante|caiu drasticamente|números alarmantes|grande aumento|queda significativa/i.test(t)
    }
];
    // Função de análise do texto
function analisarTexto() {
    const texto = textarea.value.trim();
    resultadoContainer.innerHTML = "";

    if (texto === "") {
        resultadoContainer.innerHTML = "<p>Por favor, forneça algum texto para analisar.</p>";
        return;
    }

    criterios.forEach(criterio => {
        let status = "";
        let cor = "";

        if (criterio.nome === "Fontes citadas") {
            const resultado = criterio.func(texto);
            if (resultado === "detectada") {
                status = "Fonte detectada – verifique confiabilidade";
                cor = "#eab308"; // amarelo
            } else {
                status = "Nenhuma fonte detectada";
                cor = "#ef4444"; // vermelho
            }
        } else {
            if (criterio.func(texto)) {
                status = "Problema identificado";
                cor = "#ef4444"; // vermelho
            } else {
                status = "Adequado";
                cor = "#22c55e"; // verde
            }
        }

        const div = document.createElement("div");
        div.classList.add("criterio");
        div.innerHTML = `
            <strong style="color:${cor}">${criterio.nome}: ${status}</strong>
            <p>${criterio.descricao}</p>
        `;
        resultadoContainer.appendChild(div);
    });
}

    // Evento de click
botao.addEventListener("click", analisarTexto);