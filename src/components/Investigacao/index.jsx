import React, { useState, useEffect, useRef } from 'react';
import './Investigacao.css'; // Garante que tens o teu CSS associado

const Investigacao = () => {
  // 1. Estado para controlar o filtro selecionado (Todos, Artigo, etc.)
  const [filtro, setFiltro] = useState('todos');

  // 2. Referências (Refs) para o React ancorar o Gráfico e o Tooltip
  const graficoRef = useRef(null);
  const tooltipRef = useRef(null);

  // 3. Dados fictícios de Produção Científica do CACA (adaptados do teu graficoD3.js)
  const dadosProducao = [
    { ano: 2021, tipo: "Artigo", quantidade: 12, detalhes: "Artigos publicados em revistas internacionais indexadas (Q1/Q2)." },
    { ano: 2021, tipo: "Capítulo de Livro", quantidade: 4, detalhes: "Capítulos focados em saúde insular e telemedicina." },
    { ano: 2021, tipo: "Apresentação", quantidade: 8, detalhes: "Comunicações orais em congressos nacionais." },
    { ano: 2022, tipo: "Artigo", quantity: 15, quantidade: 16, detalhes: "Aumento de publicações na área de oncologia e genética." },
    { ano: 2022, tipo: "Capítulo de Livro", quantidade: 5, detalhes: "Manuais clínicos para apoio aos cuidados primários." },
    { ano: 2022, tipo: "Apresentação", quantidade: 12, detalhes: "Apresentações em painéis internacionais." },
    { ano: 2023, tipo: "Artigo", quantidade: 22, detalhes: "Recorde de publicações com fator de impacto elevado." },
    { ano: 2023, tipo: "Capítulo de Livro", quantidade: 3, detalhes: "Cooperação internacional em investigação clínica." },
    { ano: 2023, tipo: "Apresentação", quantidade: 19, detalhes: "Palestras convidadas sobre saúde pública nos Açores." },
    { ano: 2024, tipo: "Artigo", quantidade: 28, detalhes: "Estudos alargados sobre a saúde da população açoriana." },
    { ano: 2024, tipo: "Capítulo de Livro", quantidade: 8, detalhes: "Novas edições académicas submetidas." },
    { ano: 2024, tipo: "Apresentação", quantidade: 25, detalhes: "Forte presença no Encontro de Ciência nos Açores." }
  ];

  // 4. Efeito do React que desenha o gráfico sempre que o componente monta ou o filtro muda
  useEffect(() => {
    // Verificar se a biblioteca D3 está disponível globalmente (via CDN no index.html)
    const d3 = window.d3;
    if (!d3 || !graficoRef.current) return;

    // --- PASSO A: Limpar o gráfico anterior para não duplicar no ecrã ---
    d3.select(graficoRef.current).selectAll("*").remove();

    // --- PASSO B: Filtrar e Agrupar os Dados ---
    const dadosFiltrados = filtro === 'todos' 
      ? dadosProducao 
      : dadosProducao.filter(d => d.tipo === filtro);

    // Agrupar quantidades por ano
    const anos = [...new Set(dadosProducao.map(d => d.ano))];
    const totaisPorAno = anos.map(ano => {
      const soma = dadosFiltrados
        .filter(d => d.ano === ano)
        .reduce((acc, cur) => acc + cur.quantidade, 0);
      
      // Criar descrição do tooltip juntando os detalhes
      const detalhesAgrupados = dadosFiltrados
        .filter(d => d.ano === ano)
        .map(d => `${d.tipo}: ${d.quantidade} (${d.detalhes})`)
        .join("<br/><br/>");

      return { ano, quantidade: soma, detalhes: detalhesAgrupados || "Sem registos para este filtro." };
    });

    // --- PASSO C: Configurar Margens e Dimensões do Gráfico ---
    const larguraContainer = graficoRef.current.clientWidth || 600;
    const margem = { topo: 30, direita: 20, base: 50, esquerda: 40 };
    const largura = larguraContainer - margem.esquerda - margem.direita;
    const altura = 350 - margem.topo - margem.base;

    // Criar o elemento SVG principal inserido na Ref do React
    const svg = d3.select(graficoRef.current)
      .append("svg")
      .attr("width", largura + margem.esquerda + margem.direita)
      .attr("height", altura + margem.topo + margem.base)
      .append("g")
      .attr("transform", `translate(${margem.esquerda}, ${margem.topo})`);

    // --- PASSO D: Definir as Escalas (Eixos X e Y) ---
    const x = d3.scaleBand()
      .domain(anos)
      .range([0, largura])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(totaisPorAno, d => d.quantidade) || 10])
      .nice()
      .range([altura, 0]);

    // --- PASSO E: Desenhar os Eixos na Tela ---
    svg.append("g")
      .attr("transform", `translate(0, ${altura})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "14px");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "12px");

    // Selecionar a Ref do Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // --- PASSO F: Desenhar as Barras com Animação e Tooltip Interativo ---
    svg.selectAll(".bar")
      .data(totaisPorAno)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.ano))
      .attr("width", x.bandwidth())
      .attr("y", altura) // Começa na base para a animação
      .attr("height", 0)
      .attr("fill", "#005b96") // Cor institucional azul do CACA
      .attr("rx", 4) // Cantos ligeiramente arredondados para design moderno
      // Eventos do Rato para o Tooltip (Interatividade JavaScript exigida no PEI2)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "#03396c"); // Efeito Hover
        tooltip.style("opacity", 1)
          .html(`<strong>Ano ${d.ano}</strong><br/>Total: ${d.quantidade} publicações<br/><br/>${d.detalhes}`);
      })
      .on("mousemove", function(event) {
        // Posicionar o tooltip perto do cursor do rato
        tooltip
          .style("left", (event.pageX - graficoRef.current.getBoundingClientRect().left + 15) + "px")
          .style("top", (event.pageY - window.scrollY - 120) + "px");
      })
      .on("mouseleave", function() {
        d3.select(this).attr("fill", "#005b96"); // Restaura a cor original
        tooltip.style("opacity", 0); // Esconde o tooltip
      })
      // Animação de transição ao carregar (Interatividade fluida)
      .transition()
      .duration(800)
      .attr("y", d => y(d.quantidade))
      .attr("height", d => altura - y(d.quantidade));

  }, [filtro]); // Executa novamente este bloco sempre que o estado 'filtro' mudar

  return (
    <section id="investigacao" className="section-padding">
      <div className="section-header">
        <h2>Produção Científica</h2>
        <p>Estatísticas de publicações e projetos de investigação do Centro Académico Clínico dos Açores.</p>
      </div>

      <div className="grafico-container" style={{ position: 'relative' }}>
        <div className="filtros-grafico">
          <label htmlFor="filtro-tipo">Filtrar por Tipo: </label>
          {/* Ligamos o select diretamente ao estado do React com value e onChange */}
          <select 
            id="filtro-tipo" 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="Artigo">Artigos</option>
            <option value="Capítulo de Livro">Capítulos de Livro</option>
            <option value="Apresentação">Apresentações</option>
          </select>
        </div>

        {/* O D3 vai injetar o SVG gerado dinamicamente exatamente aqui dentro desta Ref */}
        <div ref={graficoRef} id="grafico-producao"></div>

        {/* O Tooltip controlado pelo React e gerido pelo D3 */}
        <div 
          ref={tooltipRef} 
          id="tooltip" 
          className="tooltip" 
          style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
        ></div>
      </div>
    </section>
  );
};

export default Investigacao;