import "./Investigacao.css"

export default function Investigacao(){
    return(
        <section id="investigacao" className="investigacao" tabindex="0">
          <h1 id="titulo-investigacao">Áreas de Investigação</h1>
          
          <div className="grid-investigacao">
            <div className="grid-box-investigacao">
              <h3>Epidemiologia</h3>
              <p>A epidemiologia é a ciência que estuda a distribuição, determinantes e prevenção de doenças
                em populações, sendo essencial para a tomada de decisões em saúde pública. Nos Açores, a doença
                Machado-Joseph é estudada epidemiologicamente, permitindo compreender sua prevalência, risco
                e impacto na comunidade. 
                <a className="saiba-mais" tabindex="0" role="button" aria-label="Expandir informações sobre epidemiologia">Saiba mais</a>
                <div className="texto-extra">
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
              <p><strong>Professor Responsável: </strong>Maria Silva<br></br>
                <strong>Contacto:</strong> <a href="mailto:maria.silva@uac.pt" aria-label="Enviar e-mail para Maria Silva">maria.silva@uac.pt</a>
              </p>
            </div>
            <div className="grid-box-investigacao">
              <h3>Telemedicina</h3>
              <p>A telemedicina representa a prestação de cuidados de saúde à distância, sendo potenciada por
                plataformas que garantem a integridade dos dados, protocolos automáticos para a triagem eficiente e
                acesso rápido a histórico clínico. Nos Açores, a telemedicina pode permitir encaminhamentos rápidos entre
                ilhas, gerindo os diferentes recursos e incluindo a transferência segura de informações clínicas. 
                <a className="saiba-mais" tabindex="0" role="button" aria-label="Expandir informações sobre telemedicina">Saiba mais</a>
                <div className="texto-extra">
                  A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população
                  açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção
                  e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores,
                  profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e
                  metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das
                  particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa
                  multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de
                  investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações de mestrado e
                  doutoramento dedicadas à saúde pública e às doenças genéticas na região.
                </div>
              </p>
              <p><strong>Professor Responsável: </strong>Ana Campos<br></br>
                <strong>Contacto:</strong> <a href="mailto:ana.campos@uac.pt" aria-label="Enviar e-mail para Ana Campos">ana.campos@uac.pt</a>
              </p>
            </div>
            <div className="grid-box-investigacao">
              <h3>Saúde Mental</h3>
              <p>A saúde mental refere-se ao bem-estar emocional, psicológico e social de uma pessoa,
                influenciando como pensa, sente e age no dia a dia, bem como a capacidade de lidar com o stress, relacionar-se
                e tomar decisões. Sendo os Açores a região do país com maior taxa de obesidade e suicídios, a
                promoção estruturada do exercício físico pode contribuir simultaneamente para a saúde física e mental. 
                <a className="saiba-mais" tabindex="0" role="button" aria-label="Expandir informações sobre saúde mental">Saiba mais</a>
                <div className="texto-extra">A investigação nesta área procura identificar padrões de doença, fatores de risco e tendências de saúde na população açoriana. A análise de dados clínicos e demográficos permite apoiar políticas públicas, orientar programas de prevenção e melhorar a resposta dos serviços de saúde às necessidades da população. A colaboração entre investigadores, profissionais de saúde e instituições académicas permite desenvolver estudos populacionais, bases de dados regionais e metodologias de análise estatística aplicadas à saúde pública. Esta abordagem contribui para uma melhor compreensão das particularidades epidemiológicas de regiões insulares. A área de epidemiologia do CACA integra uma equipa multidisciplinar de investigadores e estudantes de pós-graduação. Atualmente estão em desenvolvimento vários projetos de investigação e estudos populacionais, que já resultaram em diversas publicações científicas e dissertações de mestrado e doutoramento dedicadas à saúde pública e às doenças genéticas na região.</div>
              </p>
              <p><strong>Professor Responsável: </strong>José Rocha<br></br>
                <strong>Contacto:</strong> <a href="mailto:jose.rocha@uac.pt" aria-label="Enviar e-mail para José Rocha">jose.rocha@uac.pt</a>
              </p>
            </div>
          </div>

          <div className="grafico-container">
            <h3>Produção Académica e Científica</h3>
            <div id="grafico-producao" role="img" aria-label="Gráfico de barras mostrando a produção académica por categoria">
            </div>
          </div>
        </section>
    );
}