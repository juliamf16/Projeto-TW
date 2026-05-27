import "./Parceiros.css"

import INOVA_2 from "./media/INOVA-2.png"
import UAC_2 from "./media/UAc-2.png"
import HDES_2 from "./media/HDES-2.png"
import USISM_2 from "./media/USISM-2.png"

export default function Parceiros(){
    return(
        <section id="parceiros" className="parceiros" tabindex="0">
				<h1 id="titulo-parceiros">Instituições Parceiras</h1>
				<p>Instituições de ensino, investigação e saúde que colaboram no âmbito do Centro Académico Clínico dos Açores:</p>
				
				<div className="grid-parceiros">
					<a href="https://uac.pt/" target="_blank" className="grid-box" aria-label="Universidade dos Açores (abre nova página)">
						<img src={UAC_2} alt="Universidade dos Açores"/>
					</a>
					<a href="https://www.hdes.pt/" target="_blank" className="grid-box" aria-label="Hospital do Divino Espírito Santo (abre nova página)">
						<img src={HDES_2} alt="Hospital do Divino Espírito Santo"/>
					</a>
					<a href="https://usism.azores.gov.pt/wp/" target="_blank" className="grid-box" aria-label="Unidade de Saúde da Ilha de São Miguel (abre nova página)">
						<img src={USISM_2} alt="Unidade de Saúde da Ilha de São Miguel"/>
					</a>
					<a href="https://www.inovacores.pt/" target="_blank" className="grid-box" aria-label="Instituto de Inovação Tecnológica dos Açores (abre nova página)">
						<img src={INOVA_2} alt="Instituto de Inovação Tecnológica dos Açores"/>
					</a>
				</div>
			</section>
    );
}