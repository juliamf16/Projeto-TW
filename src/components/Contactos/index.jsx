import "./Contactos.css"

export default function Contactos(){
    return(
        <section id="contactos" class="contactos" tabindex="0">
				<h1 id="titulo-contactos">Contactos</h1>
				
				<div class="contactos-container">
					<div class="contacto-mapa">
						<iframe src="https://www.google.com/maps?q=Universidade+dos+Açores+Ponta+Delgada&output=embed" 
								title="Mapa da Universidade dos Açores em Ponta Delgada"
								aria-label="Mapa mostrando a localização da Universidade dos Açores">
						</iframe>
					</div>
					
					<div class="contacto-info">
						<h4>📍 Morada:</h4>
						<p>Centro Académico Clínico dos Açores</p>
						<p>Universidade dos Açores</p>
						<p>Campus Universitário de Ponta Delgada</p>
						<p>9500-018 Ponta Delgada</p>
						<p>Ilha de São Miguel - Açores - Portugal</p>
						<br/><br/>
						<h4>📞 Telefone:</h4>
						<p>(+351) 296 650 000</p>
						<br/><br/>
						<h4>📧 Email:</h4>
						<a href="mailto:caca@uac.pt" aria-label="Enviar e-mail para caca@uac.pt">caca@uac.pt</a>
					</div>
					
					<div class="contacto-form">
						<h4>Contacte-nos:</h4>
						<form aria-label="Formulário de contacto">
							<input type="text" placeholder="Nome Completo" class="nome_contacto" id="nome_contacto" aria-label="Nome completo"/>
							<div class="mensagem-erro" id="erro-nome" aria-label="Nome não pode estar vazio"></div>

							<input type="email" placeholder="Email" class="email_contacto" id="email_contacto" aria-label="Endereço de e-mail"/>
							<div class="mensagem-erro" id="erro-email" aria-label="Email não pode estar vazio"></div>

							<div class="telemovel-group">
								<select aria-label="País de residência" class="indicativo_contacto" required>
									    <option value="+351">🇵🇹 +351</option>
								</select>
								<input type="tel" placeholder="Número de Telemóvel" class="telemovel_contacto" id="telemovel_contacto"/>
							</div>
							<div class="mensagem-erro" id="erro-telemovel" aria-label="Telemóvel não pode estar vazio"></div>

							<select class="assunto_contacto" id="assunto_contacto" aria-label="Assunto da mensagem">
								<option value="default">Selecione um assunto</option>
								<option value="opt1">Pedido de informações</option>
								<option value="opt2">Proposta de parceria/colaboração</option>
								<option value="opt3">Informações sobre oportunidades</option>
								<option value="opt4">Participação em eventos/seminários</option>
								<option value="opt5">Sugestão/Reclamação</option>
								<option value="opt6">Outro Assunto</option>
							</select>
							<div class="mensagem-erro" id="erro-assunto" aria-label="Assunto não pode estar vazio"></div>

							<textarea placeholder="Mensagem" class="mensagem_contacto" id="mensagem_contacto" aria-label="Conteúdo da mensagem"></textarea>
							<div class="mensagem-erro" id="erro-mensagem" aria-label="Mensagem não pode estar vazio"></div>
							
							<button type="submit" class="enviar">Enviar mensagem</button>
						</form>
					</div>
				</div>
			</section>
    );
}