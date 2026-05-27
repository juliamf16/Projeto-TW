import "./Eventos.css"

export default function Eventos(){
    return(
        <section id="eventos" className="eventos-section">
            <h1>Gestão de Eventos</h1>
            <div className="eventos-container">
                <div className="eventos-formulario">
                    <h2 id="titulo-formulario">Adicionar Novo Evento</h2>
                    <form id="formulario-eventos" aria-label="Formulário para adicionar ou editar eventos">
                        <div className="form-group">
                            <label htmlFor="evento-titulo">Título do Evento</label>
                            <input 
                                type="text" 
                                id="evento-titulo" 
                                placeholder="Seminário de Saúde Mental"
                                required
                                aria-label="Título do evento"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="evento-descricao">Descrição</label>
                            <input type="text" 
                                id="evento-descricao" 
                                placeholder="Descreva o evento..."
                                required
                                aria-label="Descrição do evento"
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="evento-data">Data do Evento</label>
                            <input 
                                type="date" 
                                id="evento-data" 
                                required
                                aria-label="Data do evento"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="evento-hora">Hora do Evento</label>
                            <input 
                                type="time" 
                                id="evento-hora" 
                                required
                                aria-label="Hora do evento"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="local-evento">Local do Evento</label>
                            <select className="local-evento" id="evento-cidade" aria-label="Local do evento">
                                    <option value="default">Selecione um local</option>
                                    <option value="Ponta Delgada">Ponta Delgada</option>
                                    <option value="Angra do Heroísmo">Angra do Heroísmo</option>
                                    <option value="Horta">Horta</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input 
                                type="text" 
                                id="evento-local" 
                                placeholder="Auditório Principal"
                                required
                                aria-label="Local do evento"
                            />
                            <div className="erro-validacao" id="erro-evento"></div>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" id="btn-submit-evento" className="btn-submit">Adicionar Evento</button>
                            <button type="reset" id="btn-cancelar-evento" className="btn-cancelar" style={{ display: 'none' }}>Cancelar</button>
                        </div>
                    </form>
                </div>

                <div className="eventos-lista">
                    <h2>Eventos Registados</h2>
                    <div id="lista-eventos" aria-label="Lista de eventos">
                        <p className="sem-eventos">Nenhum evento registado ainda.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}