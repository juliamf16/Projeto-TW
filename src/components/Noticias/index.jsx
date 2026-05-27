import "./Noticias.css"

import palestrante from "./media/palestrante-2.png"
import palestra from "./media/palestra-2.png"
import poster from "./media/Poster-2.png"

export default function Notícias(){
    return(
        <section id="noticias" className="noticias" tabindex="0">
          <h1 id="titulo-noticias">Notícias</h1>

          <div className="carrossel-noticias" aria-label="Notícias em destaque">
            <button className="carrossel-btn prev" aria-label="Notícia anterior"></button>

            <div className="carrossel-wrapper">
              <div className="carrossel-slides">
                <div className="carrossel-item active">
                  <div className="grid-titulo-data">
                    <div className="grid-titulo">
                      <h3>Seminário “Saúde mental e exercício físico”</h3>
                    </div>
                    <div className="grid-data">
                      <h3>28 de Março de 2026</h3>
                    </div>
                  </div>
                  <div className="grid-noticias">
                    <div className="grid-box-imagem">
                      <img src={palestrante} alt="Palestrante durante seminário sobre saúde mental"></img>
                    </div>
                    <div className="grid-box-texto">
                      <p><strong>Programa</strong><br></br><br></br>
                        09:00 - 09:15 | Sessão de Abertura<br></br>
                        09:15 - 10:00 | Exercício físico como ferramenta de promoção da saúde mental<br></br>
                        10:00 - 10:45 | Atividade física e prevenção da ansiedade e depressão<br></br>
                        10:45 - 11:15 | Pausa para Café<br></br>
                        11:15 - 11:45 | Mesa Redonda<br></br>
                        Debate sobre estratégias para incentivar estilos de vida ativos<br></br>
                        11:45 - 12:15 | Discussão Aberta<br></br>
                        Perguntas do público e partilha de experiências<br></br>
                        12:15 - 12:30 | Sessão de Encerramento<br></br><br></br>
                        Aberto à comunidade académica e ao público geral
                      </p>
                    </div>
                  </div>
                  <p className="noticias-categoria"><strong>Saúde Mental</strong></p>
                </div>

                <div className="carrossel-item">
                  <div className="grid-titulo-data">
                    <div className="grid-titulo">
                      <h3>Formação “Melhorias a Linha de Saúde Açores”</h3>
                    </div>
                    <div className="grid-data">
                      <h3>15 de Fevereiro de 2026</h3>
                    </div>
                  </div>
                  <div className="grid-noticias">
                    <div className="grid-box-imagem">
                      <img src={palestra} alt="Profissionais durante formação em telemedicina"></img>
                    </div>
                    <div className="grid-box-texto">
                      <p>
                        Profissionais da área da saúde participaram recentemente numa <strong>ação de
                        formação dedicada à melhoria do funcionamento da Linha de Saúde Açores</strong>, com
                        o objetivo de reforçar a qualidade do atendimento, otimizar os processos de
                        triagem e garantir uma resposta mais eficaz às necessidades da população.<br></br><br></br>
                        A iniciativa reuniu médicos, enfermeiros e técnicos de atendimento,
                        abordando temas como comunicação clínica à distância, utilização de
                        protocolos de triagem e gestão segura da informação clínica. Durante a
                        sessão foram também apresentados exemplos de <strong>boas práticas no acompanhamento
                        remoto de utentes</strong>.<br></br><br></br>
                        O evento contou ainda com a colaboração de investigadores associados ao
                        Centro Académico Clínico dos Açores (CACA), que apresentaram o <strong>trabalho
                        desenvolvido na área da telemedicina.</strong>
                      </p>
                    </div>
                  </div>
                  <p className="noticias-categoria"><strong>Telemedicina</strong></p>
                </div>

                <div className="carrossel-item">
                  <div className="grid-titulo-data">
                    <div className="grid-titulo">
                      <h3>Participação no “International Epidemiology Conference”</h3>
                    </div>
                    <div className="grid-data">
                      <h3>8 de Janeiro de 2026</h3>
                    </div>
                  </div>
                  <div className="grid-noticias">
                    <div className="grid-box-imagem">
                      <img src={poster} alt="Investigadora apresenta poster sobre Doença de Machado-Joseph"></img>
                    </div>
                    <div className="grid-box-texto">
                      <p>
                        A investigadora Joana Cabral, associada ao Centro Académico Clínico dos Açores (CACA),
                        participou recentemente num congresso internacional dedicado às doenças
                        neurológicas raras, onde apresentou <strong>novos dados sobre a epidemiologia da
                        Doença de Machado-Joseph no arquipélago.</strong><br></br><br></br>
                        Durante a apresentação foram discutidas estatísticas recentes que <strong>confirmam
                        os Açores como uma das regiões do mundo com maior prevalência desta doença
                        genética</strong>, estimada em cerca de 39 casos por 100 mil habitantes.<br></br><br></br>
                        A participação no congresso permitiu divulgar o <strong>trabalho desenvolvido no
                        âmbito da área de epidemiologia do CACA</strong>.
                      </p>
                    </div>
                  </div>
                  <p className="noticias-categoria"><strong>Epidemiologia</strong></p>
                </div>
              </div>
            </div>

            <button className="carrossel-btn next" aria-label="Notícia seguinte"></button>
            
            <div className="carrossel-indicadores" role="group" aria-label="Indicadores do carrossel">
              <span className="indicador active" data-slide="0" tabindex="0" role="button" aria-label="Ir para notícia 1"></span>
              <span className="indicador" data-slide="1" tabindex="0" role="button" aria-label="Ir para notícia 2"></span>
              <span className="indicador" data-slide="2" tabindex="0" role="button" aria-label="Ir para notícia 3"></span>
            </div>
          </div>
        
          <div className="newsletter-container">
            <div className="newsletter-logotipo3d">
              <div id="dna-container"></div>
            </div>
            <div className="newsletter-formulario">
              <h3>Subscreva a nossa newsletter!</h3>
              <form aria-label="Formulário de subscrição da newsletter">
                <input type="email" placeholder="  📧 Insira o seu e-mail aqui" className="email_newsletter" aria-label="Endereço de e-mail" required></input>

                <select id="pais" aria-label="País de residência" className="pais_selector" required>
                  <option value="default">🏳️ Selecione o seu país</option>
                </select>
                <button type="submit" className="enviar_newsletter">Subscrever</button>				
              </form>
            </div>
          </div>
        </section>
    );
}