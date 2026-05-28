import React, { useState } from "react";
import "./Parceiros.css";

import INOVA_2 from "./media/INOVA-2.png";
import UAC_2 from "./media/UAc-2.png";
import HDES_2 from "./media/HDES-2.png";
import USISM_2 from "./media/USISM-2.png";

const parceiros = [
  {
    id: "uac",
    nome: "Universidade dos Açores",
    logo: UAC_2,
    link: "https://uac.pt/",
    alt: "Universidade dos Açores",
  },
  {
    id: "hdes",
    nome: "Hospital do Divino Espírito Santo",
    logo: HDES_2,
    link: "https://www.hdes.pt/",
    alt: "Hospital do Divino Espírito Santo",
  },
  {
    id: "usism",
    nome: "Unidade de Saúde da Ilha de São Miguel",
    logo: USISM_2,
    link: "https://usism.azores.gov.pt/wp/",
    alt: "Unidade de Saúde da Ilha de São Miguel",
  },
  {
    id: "inova",
    nome: "Instituto de Inovação Tecnológica dos Açores",
    logo: INOVA_2,
    link: "https://www.inovacores.pt/",
    alt: "Instituto de Inovação Tecnológica dos Açores",
  },
];

export default function Parceiros() {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);
  const handleFocus = (id) => setHoveredId(id);
  const handleBlur = () => setHoveredId(null);

  return (
    <section id="parceiros" className="parceiros" tabIndex="0">
      <h1 id="titulo-parceiros">Instituições Parceiras</h1>
      <p>
        Instituições de ensino, investigação e saúde que colaboram no âmbito do
        Centro Académico Clínico dos Açores:
      </p>

      <div className="grid-parceiros">
        {parceiros.map((parceiro) => (
          <a
            key={parceiro.id}
            href={parceiro.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`grid-box ${hoveredId === parceiro.id ? "hover-ativo" : ""}`}
            aria-label={`${parceiro.nome} (abre nova página)`}
            tabIndex="0"
            role="button"
            onMouseEnter={() => handleMouseEnter(parceiro.id)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(parceiro.id)}
            onBlur={handleBlur}
          >
            <img src={parceiro.logo} alt={parceiro.alt} />
            <div className="parceiro-nome">{parceiro.nome}</div>
            <div className="parceiro-brilho"></div>
          </a>
        ))}
      </div>
    </section>
  );
}