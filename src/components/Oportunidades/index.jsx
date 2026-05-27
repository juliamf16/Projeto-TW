import "./Oportunidades.css"

import oportunidades from "./media/oportunidades.jpg"

export default function Oportunidades(){
    return(
        <section id="oportunidades" class="oportunidades" tabindex="0">
				<h1 id="titulo-oportunidades">Oportunidades</h1>
				
				<div class="oportunidades-container">
					<div class="oportunidades-img">
						<img src={oportunidades} alt="Pessoas em ambiente profissional colaborando"/>
					</div>

					<div class="oportunidades-content">
						<p>Recrutamentos em curso no Centro Académico Clínico dos Açores:</p>
						<div class="tabela-content">
							<table class="tabela-oportunidades" id="tabela-oportunidades">
								<thead>
									<tr>
										<th>Nome da Oportunidade</th>
										<th>Área</th>
										<th>Modalidade</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Bolsa de Investigação Epidemiológica</td>
										<td>Saúde Pública</td>
										<td>Voluntariado</td>
										<td><a href="https://www.google.com" target="_blank" class="status aberta">ABERTA</a></td>
									</tr>
									<tr>
										<td>Estágio Clínico - Medicina Interna</td>
										<td>Clínica</td>
										<td>Bolseiro</td>
										<td><a href="https://www.google.com" target="_blank" class="status aberta">ABERTA</a></td>
									</tr>
									<tr>
										<td>Projeto de Monitorização Genética</td>
										<td>Genética</td>
										<td>Contrato com termo certo</td>
										<td><span class="status fechada">FECHADA</span></td>
									</tr>
									<tr>
										<td>Doutoramento em Ciências Biomédicas</td>
										<td>Investigação</td>
										<td>Bolseiro</td>
										<td><a href="https://www.google.com" target="_blank" class="status aberta">ABERTA</a></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
    );
}