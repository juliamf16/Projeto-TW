import React, { useState, useEffect, useRef } from "react";
import "./Investigacao.css";

export default function Investigacao() {
  // Estado para gerir a expansão independente de cada área de investigação (Saiba mais)
  const [expandido, setExpandido] = useState({
    epidemiologia: false,
    telemedicina: false,
    saudeMental: false,
  });

  // Referência para o React injetar o gráfico D3 de forma segura
  const graficoRef = useRef(null);

  // Função para alternar o estado do "Saiba mais"
  const toggleExpandir = (campo) => {
    setExpandido((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  // Efeito executado ao montar o componente para desenhar o gráfico D3 original
  useEffect(() => {
    const d3 = window.d3;
    if (!d3 || !graficoRef.current) return;

    // --- PASSO 1: Limpar qualquer desenho anterior (Evita duplicações no React) ---
    d3.select(graficoRef.current).selectAll("*").remove();

    // --- PASSO 2: Fornecer e processar os dados (Exatamente como em graficoD3.js) ---
    const data = [
      { categoria: "Projetos", tipo: "Em curso", valor: 3 },
      { categoria: "Projetos", tipo: "Concluídos", valor: 6 },
      { categoria: "Estágios", tipo: "Em curso", valor: 8 },
      { categoria: "Estágios", tipo: "Concluídos", valor: 14 },
      { categoria: "Mestrados/Doutoramentos", tipo: "Em curso", valor: 4 },
      { categoria: "Mestrados/Doutoramentos", tipo: "Concluídos", valor: 9 },
      { categoria: "Publicações", tipo: "Indexadas", valor: 16 },
      { categoria: "Publicações", tipo: "Não indexadas", valor: 5 },
    ];

    const tipos = Array.from(new Set(data.map((d) => d.tipo)));

    const dadosAgrupados = Array.from(
      d3.group(data, (d) => d.categoria),
      ([categoria, valores]) => {
        const obj = { categoria };
        valores.forEach((v) => (obj[v.tipo] = v.valor));
        return obj;
      }
    );

    const series = d3.stack().keys(tipos)(dadosAgrupados);
    const alturaTotal = series[0].length * 60 + 30 + 30;

    // --- PASSO 3: Definir dimensões e escalas (Exatamente como em definirDimensoesEEscalas) ---
    const width = 1500;
    const marginTop = 30;
    const marginRight = 150;
    const marginBottom = 30;
    const marginLeft = 180;

    const x = d3.scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleBand()
      .domain(dadosAgrupados.map((d) => d.categoria))
      .range([marginTop, alturaTotal - marginBottom])
      .padding(0.2);

    const color = d3.scaleOrdinal()
      .domain(tipos)
      .range(["#1E88E5", "#FFC107", "#4CAF50", "#F44336"]);

    // --- PASSO 4: Criar o Elemento SVG ancorado na Ref do React ---
    const svg = d3.select(graficoRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", alturaTotal)
      .attr("viewBox", [0, 0, width, alturaTotal])
      .attr("style", "max-width: 100%; height: auto;");

    // --- PASSO 5: Desenhar os retângulos das barras empilhadas ---
    svg.append("g")
      .selectAll("g")
      .data(series)
      .join("g")
        .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((D) => D.map((d) => ((d.key = D.key), d)))
      .join("rect")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d.data.categoria))
        .attr("width", (d) => x(d[1]) - x(d[0]))
        .attr("height", y.bandwidth());

    // --- PASSO 6: Adicionar os textos e valores dentro das barras ---
    svg.append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .selectAll("text")
      .data((D) => D.map((d) => ((d.key = D.key), d)))
      .join("text")
        .attr("x", (d) => x(d[1]) - 5)
        .attr("y", (d) => y(d.data.categoria) + y.bandwidth() / 2 + 5)
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text((d) => d.data[d.key] || "");

    // --- PASSO 7: Renderizar os Eixos X e Y ---
    [
      { axis: d3.axisTop(x).ticks(4), transform: `translate(0,${marginTop})`, classe: "eixo-x" },
      { axis: d3.axisLeft(y).tickSizeOuter(0), transform: `translate(${marginLeft},0)`, classe: "eixo-y" },
    ].forEach((e) => {
      svg.append("g")
        .attr("transform", e.transform)
        .attr("class", e.classe)
        .call(e.axis)
        .call((g) => g.selectAll(".domain").remove())
        .call((g) => g.selectAll(".tick text")
          .attr("font-size", "14px")
          .attr("font-weight", "500"));
    });

    // --- PASSO 8: Renderizar a Legenda Lateral do Gráfico ---
    const legend = svg.append("g")
      .attr("transform", `translate(${width - marginRight + 20}, ${marginTop})`);

    tipos.forEach((tipo, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`);

      legendRow.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(tipo));

      legendRow.append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text(tipo)
        .attr("font-size", "14px")
        .attr("font-weight", "500");
    });

  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <section id="investigacao" className="investigacao" tabIndex="0">
      <h1 id="titulo-investigacao">Áreas de Investigação</h1>

      <div className="grid-investigacao">
        {/* CARD 1: EPIDEMIOLOGIA */}
        <div className="grid-box-investigacao">
          <h3>Epidemiologia</h3>
          <p>
            A epidemiologia é a ciência que estuda a distribuição, determinantes e prevenção de doenças
            em populações, sendo essencial para a tomada de decisões em saúde pública. Nos Açores, a doença
            Machado-Joseph é estudada epidemiologicamente, permitindo compreender sua prevalência, risco
            e impacto na comunidade.{" "}
            <a
              className="saiba-mais"
              tabIndex="0"
              role="button"
              aria-label="Expandir informações sobre epidemiologia"
              onClick={() => toggleExpandir("epidemiologia")}
            >
              {expandido.epidemiologia ? "Saiba menos" : "Saiba mais"}
            </a>
            <div
              className="texto-extra"
              style={{ display: expandido.epidemiologia ? "block" : "none" }}
            >
              A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências
              de saúde na população açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar
              programas de prevenção e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre
              investigadores, profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de
              dados regionais e metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma
              melhor compreensão das particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra
              uma equipa multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários
              projetos de investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações
              de mestrado e doutoramento dedicadas à saúde pública e às doenças genéticas na região.
            </div>
          </p>
          <p>
            <strong>Professor Responsável: </strong>Maria Silva<br />
            <strong>Contacto:</strong>{" "}
            <a href="mailto:maria.silva@uac.pt" aria-label="Enviar e-mail para Maria Silva">
              maria.silva@uac.pt
            </a>
          </p>
        </div>

        {/* CARD 2: TELEMEDICINA */}
        <div className="grid-box-investigacao">
          <h3>Telemedicina</h3>
          <p>
            A telemedicina representa a prestação de cuidados de saúde à distância, sendo potenciada por
            plataformas que garantem a integridade dos dados, protocolos automáticos para a triagem eficiente e
            acesso rápido a histórico clínico. Nos Açores, a telemedicina pode permitir encaminhamentos rápidos entre
            ilhas, gerindo os diferentes recursos e incluindo a transferência segura de informações clínicas.{" "}
            <a
              className="saiba-mais"
              tabIndex="0"
              role="button"
              aria-label="Expandir informações sobre telemedicina"
              onClick={() => toggleExpandir("telemedicina")}
            >
              {expandido.telemedicina ? "Saiba menos" : "Saiba mais"}
            </a>
            <div
              className="texto-extra"
              style={{ display: expandido.telemedicina ? "block" : "none" }}
            >
              A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população
              açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção
              e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores,
              profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e
              metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das
              particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa
              multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de
              investigação e estudos populacionais, que já resultaram in diversas publicações científicas e dissertações de mestrado e
              doutoramento dedicadas à saúde pública e às doenças genéticas na região.
            </div>
          </p>
          <p>
            <strong>Professor Responsável: </strong>Ana Campos<br />
            <strong>Contacto:</strong>{" "}
            <a href="mailto:ana.campos@uac.pt" aria-label="Enviar e-mail para Ana Campos">
              ana.campos@uac.pt
            </a>
          </p>
        </div>

        {/* CARD 3: SAÚDE MENTAL */}
        <div className="grid-box-investigacao">
          <h3>Saúde Mental</h3>
          <p>
            A saúde mental refere-se ao bem-estar emocional, psicológico e social de uma pessoa,
            influenciando como pensa, sente e age no dia a dia, bem como a capacidade de lidar com o stress, relacionar-se
            e tomar decisões. Sendo os Açores a região do país com maior taxa de obesidade e suicídios, a
            promoção estruturada do exercício físico pode contribuir simultaneamente para a saúde física e mental.{" "}
            <a
              className="saiba-mais"
              tabIndex="0"
              role="button"
              aria-label="Expandir informações sobre saúde mental"
              onClick={() => toggleExpandir("saudeMental")}
            >
              {expandido.saudeMental ? "Saiba menos" : "Saiba mais"}
            </a>
            <div
              className="texto-extra"
              style={{ display: expandido.saudeMental ? "block" : "none" }}
            >
              A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores, profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações de mestrado e doutoramento dedicadas à saúde pública e às doenças genéticas na região.
            </div>
          </p>
          <p>
            <strong>Professor Responsável: </strong>José Rocha<br />
            <strong>Contacto:</strong>{" "}
            <a href="mailto:jose.rocha@uac.pt" aria-label="Enviar e-mail para José Rocha">
              jose.rocha@uac.pt
            </a>
          </p>
        </div>
      </div>

      <div className="grafico-container">
        <h3>Produção Académica e Científica</h3>
        {/* Usamos a Ref do React em vez do id puro do D3 para garantir integridade estrutural */}
        <div
          ref={graficoRef}
          id="grafico-producao"
          role="img"
          aria-label="Gráfico de barras mostrando a produção académica por categoria"
        ></div>
      </div>
    </section>
  );
}