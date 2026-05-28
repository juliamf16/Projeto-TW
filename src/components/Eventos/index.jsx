import React, { useRef, useState, useEffect } from "react";
import "./Eventos.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { carregarListaEventos, adicionarEvento, atualizarEvento, removerEvento, obterEvento } from "./eventosDB";
import { obterPrevisaoEvento, obterCoordenadasCidade } from "./eventosHelpers";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function EventoMapa({ cidade, titulo, containerId }) {
    const mapRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const initMapa = async () => {
            const coords = await obterCoordenadasCidade(cidade);
            if (!coords || !isMounted) return;

            // Verificar se o container ainda existe e se já tem um mapa
            const container = document.getElementById(containerId);
            if (!container) return;

            // Se já existir um mapa associado a este container, removê-lo
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            // Criar novo mapa
            const map = L.map(containerId).setView([coords.lat, coords.lon], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);
            L.marker([coords.lat, coords.lon]).addTo(map).bindPopup(titulo);

            if (isMounted) {
                mapRef.current = map;
            }
        };

        initMapa();

        return () => {
            isMounted = false;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [cidade, titulo, containerId]);

    return <div id={containerId} className="mapa-container"></div>;
}

export default function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        titulo: "",
        descricao: "",
        data: "",
        hora: "",
        cidade: "",
        local: "",
    });
    const [editando, setEditando] = useState(false);
    const [erroForm, setErroForm] = useState("");
    const [toast, setToast] = useState({ message: "", type: "" });

    // Carregar eventos ao montar
    useEffect(() => {
        carregarEventos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const carregarEventos = async () => {
        try {
            const lista = await carregarListaEventos();
            setEventos(lista);
        } catch (error) {
            mostrarToast("Erro ao carregar eventos", "error");
        }
    };

    const mostrarToast = (msg, tipo) => {
        setToast({ message: msg, type: tipo });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErroForm("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { titulo, descricao, data, hora, cidade, local } = formData;
        if (!titulo || !descricao || !data || !hora || !cidade || !local) {
            setErroForm("Todos os campos são obrigatórios");
            return;
        }
        try {
            if (editando) {
                await atualizarEvento(formData);
                mostrarToast("Evento atualizado com sucesso!", "success");
            } else {
                await adicionarEvento(formData);
                mostrarToast("Evento adicionado com sucesso!", "success");
            }
            resetForm();
            await carregarEventos();
        } catch (error) {
            mostrarToast("Erro ao salvar evento", "error");
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            titulo: "",
            descricao: "",
            data: "",
            hora: "",
            cidade: "",
            local: "",
        });
        setEditando(false);
        setErroForm("");
    };

    const handleEditar = async (id) => {
        try {
            const evento = await obterEvento(id);
            setFormData({
                id: evento.id,
                titulo: evento.titulo,
                descricao: evento.descricao,
                data: evento.data,
                hora: evento.hora,
                cidade: evento.cidade,
                local: evento.local,
            });
            setEditando(true);
            setErroForm("");
            // scroll ao formulário
            document.querySelector(".eventos-formulario")?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            mostrarToast("Erro ao carregar evento para edição", "error");
        }
    };

    const handleRemover = async (id) => {
        if (window.confirm("Tem a certeza que deseja remover este evento?")) {
            try {
                await removerEvento(id);
                mostrarToast("Evento removido com sucesso!", "success");
                await carregarEventos();
            } catch (error) {
                mostrarToast("Erro ao remover evento", "error");
            }
        }
    };

    const handleCancelar = () => {
        resetForm();
    };

    return (
        <section id="eventos" className="eventos">
            <h1>Gestão de Eventos</h1>
            <div className="eventos-container">
                {/* Formulário */}
                <div className="eventos-formulario">
                    <h2 id="titulo-formulario">{editando ? "Editar Evento" : "Adicionar Novo Evento"}</h2>
                    <form id="formulario-eventos" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título do Evento</label>
                            <input type="text" id="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Seminário de Saúde Mental" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <input type="text" id="descricao" value={formData.descricao} onChange={handleInputChange} placeholder="Descreva o evento..." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="data">Data do Evento</label>
                            <input type="date" id="data" value={formData.data} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hora">Hora do Evento</label>
                            <input type="time" id="hora" value={formData.hora} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <select id="cidade" value={formData.cidade} onChange={handleInputChange} required>
                                <option value="">Selecione um local</option>
                                <option value="Ponta Delgada">Ponta Delgada</option>
                                <option value="Angra do Heroísmo">Angra do Heroísmo</option>
                                <option value="Horta">Horta</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="local">Auditório / Sala</label>
                            <input type="text" id="local" value={formData.local} onChange={handleInputChange} placeholder="Auditório Principal" required />
                        </div>
                        {erroForm && <div className="erro-validacao" style={{ display: "block" }}>{erroForm}</div>}
                        <div className="form-buttons">
                            <button type="submit" className="btn-submit">{editando ? "Atualizar Evento" : "Adicionar Evento"}</button>
                            {editando && (
                                <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Lista de Eventos */}
                <div className="eventos-lista">
                    <h2>Eventos Registados</h2>
                    <div id="lista-eventos">
                        {eventos.length === 0 ? (
                            <p className="sem-eventos">Nenhum evento registado ainda.</p>
                        ) : (
                            eventos.map((evento) => (
                                <EventoCard
                                    key={evento.id}
                                    evento={evento}
                                    onEditar={handleEditar}
                                    onRemover={handleRemover}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}
        </section>
    );
}

// Componente para exibir um evento individual
function EventoCard({ evento, onEditar, onRemover }) {
    const [previsao, setPrevisao] = useState(null);
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [coordsReady, setCoordsReady] = useState(false);
    const containerId = `map-${evento.id}`;

    useEffect(() => {
        const fetchWeather = async () => {
            setLoadingWeather(true);
            const forecast = await obterPrevisaoEvento(evento.cidade, evento.data, evento.hora);
            setPrevisao(forecast);
            setLoadingWeather(false);
        };
        fetchWeather();
    }, [evento.cidade, evento.data, evento.hora]);

    // Verificar coordenadas para mostrar o mapa
    useEffect(() => {
        const checkCoords = async () => {
            const coords = await obterCoordenadasCidade(evento.cidade);
            setCoordsReady(!!coords);
        };
        checkCoords();
    }, [evento.cidade]);

    const dataFormatada = new Date(evento.data).toLocaleDateString("pt-PT");

    return (
        <div className="evento-card" data-id={evento.id}>
            <div className="evento-header">
                <h3>{evento.titulo}</h3>
                <div className="evento-actions">
                    <button className="btn-editar" onClick={() => onEditar(evento.id)}>Editar</button>
                    <button className="btn-remover" onClick={() => onRemover(evento.id)}>Remover</button>
                </div>
            </div>

            <div className="evento-weather">
                {loadingWeather ? (
                    <span>A carregar previsão...</span>
                ) : previsao ? (
                    <div className="weather-card">
                        <div className="weather-titulo">
                            <div className="weather-sumario">
                                <img src={`https://openweathermap.org/img/wn/${previsao.icon}.png`} alt="clima" />
                                {previsao.description}
                            </div>
                            <div className="weather-temp">
                                {previsao.temp}°C (Sensação: {previsao.feels_like}°C)
                            </div>
                        </div>
                        <div className="weather-body">
                            <div className="weather-details-grid">
                                <div className="weather-detail-item">
                                    <span className="detail-label">💧 Humidade</span>
                                    <span className="detail-value">{previsao.humidity}%</span>
                                </div>
                                <div className="weather-detail-item">
                                    <span className="detail-label">🌬️ Vento</span>
                                    <span className="detail-value">{previsao.wind} m/s</span>
                                </div>
                                <div className="weather-detail-item">
                                    <span className="detail-label">🌊 Nível do Mar</span>
                                    <span className="detail-value">{previsao.sea_level} m</span>
                                </div>
                                <div className="weather-detail-item">
                                    <span className="detail-label">⏲️ Pressão</span>
                                    <span className="detail-value">{previsao.pressure} hPa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span>Previsão indisponível para esta data/hora</span>
                )}
            </div>

            <div className="evento-info">
                <div className="event-details-grid">
                    <div className="event-detail-item">
                        <span className="detail-label">📅 Data</span>
                        <span className="detail-value">{dataFormatada}</span>
                    </div>
                    <div className="event-detail-item">
                        <span className="detail-label">⏰ Hora</span>
                        <span className="detail-value">{evento.hora}</span>
                    </div>
                    <div className="event-detail-item">
                        <span className="detail-label">📍 Cidade</span>
                        <span className="detail-value">{evento.cidade}</span>
                    </div>
                    <div className="event-detail-item">
                        <span className="detail-label">🏛️ Auditório</span>
                        <span className="detail-value">{evento.local}</span>
                    </div>
                    <div className="event-detail-item">
                        <span className="detail-label">📝 Descrição</span>
                        <span className="detail-value">{evento.descricao}</span>
                    </div>
                </div>
            </div>

            {coordsReady && <EventoMapa cidade={evento.cidade} titulo={evento.titulo} containerId={containerId} />}
        </div>
    );
}