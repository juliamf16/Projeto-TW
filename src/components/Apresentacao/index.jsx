import "./Apresentacao.css"

import uniFoto from "./media/universidade.png"

export default function Apresentacao() {
    return (
        <section id="apresentacao" class="apresentacao" tabindex="0">
            <div className="banner">
                <img src={uniFoto} alt="Vista aérea da Universidade dos Açores"></img>
            </div>

            <div className="texto">
                <p>
                    O <strong>Centro Académico Clínico dos Açores (CACA)</strong> é uma unidade de cooperação
                    entre instituições de ensino superior, unidades de saúde e centros de investigação.
                </p>
                <p>
                    O objetivo é aprofundar a investigação científica para que se conheça a realidade regional e os problemas diversos ao nível da saúde, como também apoiar a decisão política na área da saúde, contribuindo para a capacitação da área clínica.
                </p>
            </div>
        </section>
    );
}