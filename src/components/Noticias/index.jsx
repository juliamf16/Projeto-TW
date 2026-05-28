import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Noticias.css";
import palestrante from "./media/palestrante-2.png";
import palestra from "./media/palestra-2.png";
import poster from "./media/Poster-2.png";


import { setupDNA3D, criarEstruturaDNA, iniciarAnimacaoDNA, configurarRedimensionamentoDNA } from "./dna.jsx";
import { db } from "../../js/indexeddb";

const eEmailValido = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email.trim());
};

export const validarDadosNewsletter = (email, pais) => {
    const erros = [];
    if (email === "") erros.push("Por favor insira um e-mail!");
    else if (!eEmailValido(email)) erros.push("E-mail inválido!");
    if (pais === "default") erros.push("Por favor escolha um país!");
    return { valido: erros.length === 0, erros };
};


const adicionarSubscritor = async (email, pais) => {
    return new Promise((resolve, reject) => {
        const transaction = db.db.transaction(["subscritores"], "readwrite");
        const store = transaction.objectStore("subscritores");
        const request = store.add({ email, pais, dataSubscricao: new Date().toISOString() });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

const verificarEmailSubscrito = async (email) => {
    return new Promise((resolve, reject) => {
        const transaction = db.db.transaction(["subscritores"], "readonly");
        const store = transaction.objectStore("subscritores");
        const request = store.get(email);
        request.onsuccess = () => resolve(request.result !== undefined);
        request.onerror = () => reject(request.error);
    });
};

const listaPaisesSimples = [
    { flag: "🇦🇫", name: "Afghanistan" }, { flag: "🇦🇽", name: "Åland Islands" }, { flag: "🇦🇱", name: "Albania" },
    { flag: "🇩🇿", name: "Algeria" }, { flag: "🇦🇸", name: "American Samoa" }, { flag: "🇦🇩", name: "Andorra" },
    { flag: "🇦🇴", name: "Angola" }, { flag: "🇦🇮", name: "Anguilla" }, { flag: "🇦🇶", name: "Antarctica" },
    { flag: "🇦🇬", name: "Antigua and Barbuda" }, { flag: "🇦🇷", name: "Argentina" }, { flag: "🇦🇲", name: "Armenia" },
    { flag: "🇦🇼", name: "Aruba" }, { flag: "🇦🇺", name: "Australia" }, { flag: "🇦🇹", name: "Austria" },
    { flag: "🇦🇿", name: "Azerbaijan" }, { flag: "🇧🇸", name: "Bahamas" }, { flag: "🇧🇭", name: "Bahrain" },
    { flag: "🇧🇩", name: "Bangladesh" }, { flag: "🇧🇧", name: "Barbados" }, { flag: "🇧🇾", name: "Belarus" },
    { flag: "🇧🇪", name: "Belgium" }, { flag: "🇧🇿", name: "Belize" }, { flag: "🇧🇯", name: "Benin" },
    { flag: "🇧🇲", name: "Bermuda" }, { flag: "🇧🇹", name: "Bhutan" }, { flag: "🇧🇴", name: "Bolivia (Plurinational State of)" },
    { flag: "🇧🇶", name: "Bonaire, Sint Eustatius and Saba" }, { flag: "🇧🇦", name: "Bosnia and Herzegovina" },
    { flag: "🇧🇼", name: "Botswana" }, { flag: "🇧🇻", name: "Bouvet Island" }, { flag: "🇧🇷", name: "Brazil" },
    { flag: "🇮🇴", name: "British Indian Ocean Territory" }, { flag: "🇧🇳", name: "Brunei Darussalam" },
    { flag: "🇧🇬", name: "Bulgaria" }, { flag: "🇧🇫", name: "Burkina Faso" }, { flag: "🇧🇮", name: "Burundi" },
    { flag: "🇨🇻", name: "Cabo Verde" }, { flag: "🇰🇭", name: "Cambodia" }, { flag: "🇨🇲", name: "Cameroon" },
    { flag: "🇨🇦", name: "Canada" }, { flag: "🇰🇾", name: "Cayman Islands" }, { flag: "🇨🇫", name: "Central African Republic" },
    { flag: "🇹🇩", name: "Chad" }, { flag: "🇨🇱", name: "Chile" }, { flag: "🇨🇳", name: "China" },
    { flag: "🇨🇽", name: "Christmas Island" }, { flag: "🇨🇨", name: "Cocos (Keeling) Islands" },
    { flag: "🇨🇴", name: "Colombia" }, { flag: "🇰🇲", name: "Comoros" }, { flag: "🇨🇬", name: "Congo" },
    { flag: "🇨🇩", name: "Congo (Democratic Republic of the)" }, { flag: "🇨🇰", name: "Cook Islands" },
    { flag: "🇨🇷", name: "Costa Rica" }, { flag: "🇨🇮", name: "Côte d'Ivoire" }, { flag: "🇭🇷", name: "Croatia" },
    { flag: "🇨🇺", name: "Cuba" }, { flag: "🇨🇼", name: "Curaçao" }, { flag: "🇨🇾", name: "Cyprus" },
    { flag: "🇨🇿", name: "Czechia" }, { flag: "🇩🇰", name: "Denmark" }, { flag: "🇩🇯", name: "Djibouti" },
    { flag: "🇩🇲", name: "Dominica" }, { flag: "🇩🇴", name: "Dominican Republic" }, { flag: "🇪🇨", name: "Ecuador" },
    { flag: "🇪🇬", name: "Egypt" }, { flag: "🇸🇻", name: "El Salvador" }, { flag: "🇬🇶", name: "Equatorial Guinea" },
    { flag: "🇪🇷", name: "Eritrea" }, { flag: "🇪🇪", name: "Estonia" }, { flag: "🇸🇿", name: "Eswatini" },
    { flag: "🇪🇹", name: "Ethiopia" }, { flag: "🇫🇰", name: "Falkland Islands (Malvinas)" }, { flag: "🇫🇴", name: "Faroe Islands" },
    { flag: "🇫🇯", name: "Fiji" }, { flag: "🇫🇮", name: "Finland" }, { flag: "🇫🇷", name: "France" },
    { flag: "🇬🇫", name: "French Guiana" }, { flag: "🇵🇫", name: "French Polynesia" }, { flag: "🇹🇫", name: "French Southern Territories" },
    { flag: "🇬🇦", name: "Gabon" }, { flag: "🇬🇲", name: "Gambia" }, { flag: "🇬🇪", name: "Georgia" },
    { flag: "🇩🇪", name: "Germany" }, { flag: "🇬🇭", name: "Ghana" }, { flag: "🇬🇮", name: "Gibraltar" },
    { flag: "🇬🇷", name: "Greece" }, { flag: "🇬🇱", name: "Greenland" }, { flag: "🇬🇩", name: "Grenada" },
    { flag: "🇬🇵", name: "Guadeloupe" }, { flag: "🇬🇺", name: "Guam" }, { flag: "🇬🇹", name: "Guatemala" },
    { flag: "🇬🇬", name: "Guernsey" }, { flag: "🇬🇳", name: "Guinea" }, { flag: "🇬🇼", name: "Guinea-Bissau" },
    { flag: "🇬🇾", name: "Guyana" }, { flag: "🇭🇹", name: "Haiti" }, { flag: "🇭🇲", name: "Heard Island and McDonald Islands" },
    { flag: "⛑️", name: "Holy See" }, { flag: "🇭🇳", name: "Honduras" }, { flag: "🇭🇰", name: "Hong Kong" },
    { flag: "🇭🇺", name: "Hungary" }, { flag: "🇮🇸", name: "Iceland" }, { flag: "🇮🇳", name: "India" },
    { flag: "🇮🇩", name: "Indonesia" }, { flag: "🇮🇷", name: "Iran (Islamic Republic of)" }, { flag: "🇮🇶", name: "Iraq" },
    { flag: "🇮🇪", name: "Ireland" }, { flag: "🇮🇲", name: "Isle of Man" }, { flag: "🇮🇱", name: "Israel" },
    { flag: "🇮🇹", name: "Italy" }, { flag: "🇯🇲", name: "Jamaica" }, { flag: "🇯🇵", name: "Japan" },
    { flag: "🇯🇪", name: "Jersey" }, { flag: "🇯🇴", name: "Jordan" }, { flag: "🇰🇿", name: "Kazakhstan" },
    { flag: "🇰🇪", name: "Kenya" }, { flag: "🇰🇮", name: "Kiribati" }, { flag: "🇰🇵", name: "Korea (Democratic People's Republic of)" },
    { flag: "🇰🇷", name: "Korea (Republic of)" }, { flag: "🇰🇼", name: "Kuwait" }, { flag: "🇰🇬", name: "Kyrgyzstan" },
    { flag: "🇱🇦", name: "Lao People's Democratic Republic" }, { flag: "🇱🇻", name: "Latvia" }, { flag: "🇱🇧", name: "Lebanon" },
    { flag: "🇱🇸", name: "Lesotho" }, { flag: "🇱🇷", name: "Liberia" }, { flag: "🇱🇾", name: "Libya" },
    { flag: "🇱🇮", name: "Liechtenstein" }, { flag: "🇱🇹", name: "Lithuania" }, { flag: "🇱🇺", name: "Luxembourg" },
    { flag: "🇲🇴", name: "Macao" }, { flag: "🇲🇬", name: "Madagascar" }, { flag: "🇲🇼", name: "Malawi" },
    { flag: "🇲🇾", name: "Malaysia" }, { flag: "🇲🇻", name: "Maldives" }, { flag: "🇲🇱", name: "Mali" },
    { flag: "🇲🇹", name: "Malta" }, { flag: "🇲🇭", name: "Marshall Islands" }, { flag: "🇲🇶", name: "Martinique" },
    { flag: "🇲🇷", name: "Mauritania" }, { flag: "🇲🇺", name: "Mauritius" }, { flag: "🇾🇹", name: "Mayotte" },
    { flag: "🇲🇽", name: "Mexico" }, { flag: "🇫🇲", name: "Micronesia (Federated States of)" }, { flag: "🇲🇩", name: "Moldova (Republic of)" },
    { flag: "🇲🇨", name: "Monaco" }, { flag: "🇲🇳", name: "Mongolia" }, { flag: "🇲🇪", name: "Montenegro" },
    { flag: "🇲🇸", name: "Montserrat" }, { flag: "🇲🇦", name: "Morocco" }, { flag: "🇲🇿", name: "Mozambique" },
    { flag: "🇲🇲", name: "Myanmar" }, { flag: "🇳🇦", name: "Namibia" }, { flag: "🇳🇷", name: "Nauru" },
    { flag: "🇳🇵", name: "Nepal" }, { flag: "🇳🇱", name: "Netherlands" }, { flag: "🇳🇨", name: "New Caledonia" },
    { flag: "🇳🇿", name: "New Zealand" }, { flag: "🇳🇮", name: "Nicaragua" }, { flag: "🇳🇪", name: "Niger" },
    { flag: "🇳🇬", name: "Nigeria" }, { flag: "🇳🇺", name: "Niue" }, { flag: "🇳🇫", name: "Norfolk Island" },
    { flag: "🇲🇰", name: "North Macedonia" }, { flag: "🇲🇵", name: "Northern Mariana Islands" }, { flag: "🇳🇴", name: "Norway" },
    { flag: "🇴🇲", name: "Oman" }, { flag: "🇵🇰", name: "Pakistan" }, { flag: "🇵🇼", name: "Palau" },
    { flag: "🇵🇸", name: "Palestine, State of" }, { flag: "🇵🇦", name: "Panama" }, { flag: "🇵🇬", name: "Papua New Guinea" },
    { flag: "🇵🇾", name: "Paraguay" }, { flag: "🇵🇪", name: "Peru" }, { flag: "🇵🇭", name: "Philippines" },
    { flag: "🇵🇳", name: "Pitcairn" }, { flag: "🇵🇱", name: "Poland" }, { flag: "🇵🇹", name: "Portugal" },
    { flag: "🇵🇷", name: "Puerto Rico" }, { flag: "🇶🇦", name: "Qatar" }, { flag: "🇷🇪", name: "Réunion" },
    { flag: "🇷🇴", name: "Romania" }, { flag: "🇷🇺", name: "Russian Federation" }, { flag: "🇷🇼", name: "Rwanda" },
    { flag: "🇧🇱", name: "Saint Barthélemy" }, { flag: "🇸🇭", name: "Saint Helena, Ascension and Tristan da Cunha" },
    { flag: "🇰🇳", name: "Saint Kitts and Nevis" }, { flag: "🇱🇨", name: "Saint Lucia" }, { flag: "🇲🇫", name: "Saint Martin (French part)" },
    { flag: "🇵🇲", name: "Saint Pierre and Miquelon" }, { flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
    { flag: "🇼🇸", name: "Samoa" }, { flag: "🇸🇲", name: "San Marino" }, { flag: "🇸🇹", name: "Sao Tome and Principe" },
    { flag: "🇸🇦", name: "Saudi Arabia" }, { flag: "🇸🇳", name: "Senegal" }, { flag: "🇷🇸", name: "Serbia" },
    { flag: "🇸🇨", name: "Seychelles" }, { flag: "🇸🇱", name: "Sierra Leone" }, { flag: "🇸🇬", name: "Singapore" },
    { flag: "🇸🇽", name: "Sint Maarten (Dutch part)" }, { flag: "🇸🇰", name: "Slovakia" }, { flag: "🇸🇮", name: "Slovenia" },
    { flag: "🇸🇧", name: "Solomon Islands" }, { flag: "🇸🇴", name: "Somalia" }, { flag: "🇿🇦", name: "South Africa" },
    { flag: "🇬🇸", name: "South Georgia and the South Sandwich Islands" }, { flag: "🇸🇸", name: "South Sudan" },
    { flag: "🇪🇸", name: "Spain" }, { flag: "🇱🇰", name: "Sri Lanka" }, { flag: "🇸🇩", name: "Sudan" },
    { flag: "🇸🇷", name: "Suriname" }, { flag: "🇸🇯", name: "Svalbard and Jan Mayen" }, { flag: "🇸🇪", name: "Sweden" },
    { flag: "🇨🇭", name: "Switzerland" }, { flag: "🇸🇾", name: "Syrian Arab Republic" }, { flag: "🇹🇼", name: "Taiwan (Province of China)" },
    { flag: "🇹🇯", name: "Tajikistan" }, { flag: "🇹🇿", name: "Tanzania, United Republic of" }, { flag: "🇹🇭", name: "Thailand" },
    { flag: "🇹🇱", name: "Timor-Leste" }, { flag: "🇹🇬", name: "Togo" }, { flag: "🇹🇰", name: "Tokelau" },
    { flag: "🇹🇴", name: "Tonga" }, { flag: "🇹🇹", name: "Trinidad and Tobago" }, { flag: "🇹🇳", name: "Tunisia" },
    { flag: "🇹🇷", name: "Turkey" }, { flag: "🇹🇲", name: "Turkmenistan" }, { flag: "🇹🇨", name: "Turks and Caicos Islands" },
    { flag: "🇹🇻", name: "Tuvalu" }, { flag: "🇺🇬", name: "Uganda" }, { flag: "🇺🇦", name: "Ukraine" },
    { flag: "🇦🇪", name: "United Arab Emirates" }, { flag: "🇬🇧", name: "United Kingdom of Great Britain and Northern Ireland" },
    { flag: "🇺🇸", name: "United States of America" }, { flag: "🇺🇲", name: "United States Minor Outlying Islands" },
    { flag: "🇺🇾", name: "Uruguay" }, { flag: "🇺🇿", name: "Uzbekistan" }, { flag: "🇻🇺", name: "Vanuatu" },
    { flag: "🇻🇪", name: "Venezuela (Bolivarian Republic of)" }, { flag: "🇻🇳", name: "Viet Nam" },
    { flag: "🇻🇬", name: "Virgin Islands (British)" }, { flag: "🇻🇮", name: "Virgin Islands (U.S.)" },
    { flag: "🇼🇫", name: "Wallis and Futuna" }, { flag: "🇪🇭", name: "Western Sahara" }, { flag: "🇾🇪", name: "Yemen" },
    { flag: "🇿🇲", name: "Zambia" }, { flag: "🇿🇼", name: "Zimbabwe" }
];

export default function Noticias() {
    // Carrossel
    const [currentSlide, setCurrentSlide] = useState(0);
    const carrosselRef = useRef(null);
    const totalSlides = 3;

    const getNewSlideIndex = useCallback((index) => {
        if (index < 0) return totalSlides - 1;
        if (index >= totalSlides) return 0;
        return index;
    }, [totalSlides]);

    const goToSlide = useCallback((index) => setCurrentSlide(getNewSlideIndex(index)), [getNewSlideIndex]);
    const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [goToSlide, currentSlide]);
    const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [goToSlide, currentSlide]);

    const isCarrosselVisible = useCallback(() => {
        if (!carrosselRef.current) return false;
        const rect = carrosselRef.current.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isCarrosselVisible()) return;
            if (e.key === "ArrowLeft") { prevSlide(); e.preventDefault(); }
            else if (e.key === "ArrowRight") { nextSlide(); e.preventDefault(); }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [prevSlide, nextSlide, isCarrosselVisible]);

    useEffect(() => {
        const wrapper = carrosselRef.current;
        if (!wrapper) return;
        let touchStartX = 0, touchEndX = 0;
        const swipeThreshold = 50;
        const handleTouchStart = (e) => { touchStartX = e.changedTouches[0].screenX; };
        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) diff > 0 ? nextSlide() : prevSlide();
        };
        wrapper.addEventListener("touchstart", handleTouchStart);
        wrapper.addEventListener("touchend", handleTouchEnd);
        return () => {
            wrapper.removeEventListener("touchstart", handleTouchStart);
            wrapper.removeEventListener("touchend", handleTouchEnd);
        };
    }, [nextSlide, prevSlide]);

    // Newsletter
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterPais, setNewsletterPais] = useState("default");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mostrarToast = (mensagem, tipo) => {
        document.querySelectorAll(".toast").forEach(toast => toast.remove());
        const toast = document.createElement("div");
        toast.className = `toast ${tipo}`;
        toast.innerHTML = `<span>${mensagem}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const resultado = validarDadosNewsletter(newsletterEmail, newsletterPais);
        const emailInput = document.querySelector(".email_newsletter");
        const paisSelect = document.querySelector(".pais_selector");

        if (emailInput) emailInput.style.border = "1px solid #ddd";
        if (paisSelect) paisSelect.style.border = "1px solid #ddd";
        if (!resultado.valido) {
            if (resultado.erros.some(err => err.includes("e-mail"))) emailInput.style.border = "1px solid #dc3545";
            if (resultado.erros.includes("Por favor escolha um país!")) paisSelect.style.border = "1px solid #dc3545";
            mostrarToast(resultado.erros.join("<br>"), "error");
            setIsSubmitting(false);
            return;
        }
        try {
            const existe = await verificarEmailSubscrito(newsletterEmail);
            if (existe) {
                mostrarToast("Este email já está subscrito!", "error");
                if (emailInput) emailInput.style.border = "1px solid #dc3545";
                setIsSubmitting(false);
                return;
            }
            await adicionarSubscritor(newsletterEmail, newsletterPais);
            mostrarToast("Subscrito com sucesso!", "success");
            if (emailInput) {
                emailInput.style.border = "1px solid #0f9d58";
                emailInput.style.backgroundColor = "#f8fff8";
            }
            if (paisSelect) {
                paisSelect.style.border = "1px solid #0f9d58";
                paisSelect.style.backgroundColor = "#f8fff8";
            }
            setNewsletterEmail("");
            setNewsletterPais("default");
        } catch (error) {
            console.error(error);
            mostrarToast("Erro ao subscrever. Tente novamente.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const dnaContainerRef = useRef(null);
    const dnaInitialized = useRef(false);

    useEffect(() => {
        if (!dnaContainerRef.current || dnaInitialized.current) return;
        dnaInitialized.current = true;
        const components = setupDNA3D(dnaContainerRef.current);
        if (components) {
            criarEstruturaDNA(components);
            components.scene.add(components.dnaGroup);
            iniciarAnimacaoDNA(components);
            configurarRedimensionamentoDNA(components);
        }
    }, []);

    return (
        <section id="noticias" className="noticias" tabIndex="0">
            <h1 id="titulo-noticias">Notícias</h1>

            <div className="carrossel-noticias" aria-label="Notícias em destaque" ref={carrosselRef}>
                <button className="carrossel-btn prev" aria-label="Notícia anterior" onClick={prevSlide} > ❮ </button>

                <div className="carrossel-wrapper">
                    <div className="carrossel-slides">
                        {/* Slide 1 */}
                        <div className={`carrossel-item ${currentSlide === 0 ? "active" : ""}`}>
                            <div className="grid-titulo-data">
                                <div className="grid-titulo"><h3>Seminário “Saúde mental e exercício físico”</h3></div>
                                <div className="grid-data"><h3>28 de Março de 2026</h3></div>
                            </div>
                            <div className="grid-noticias">
                                <div className="grid-box-imagem"><img src={palestrante} alt="Palestrante" /></div>
                                <div className="grid-box-texto">
                                    <p><strong>Programa</strong><br /><br />
                                        09:00 - 09:15 | Sessão de Abertura<br />
                                        09:15 - 10:00 | Exercício físico como ferramenta de promoção da saúde mental<br />
                                        10:00 - 10:45 | Atividade física e prevenção da ansiedade e depressão<br />
                                        10:45 - 11:15 | Pausa para Café<br />
                                        11:15 - 11:45 | Mesa Redonda<br />
                                        11:45 - 12:15 | Discussão Aberta<br />
                                        12:15 - 12:30 | Sessão de Encerramento<br /><br />
                                        Aberto à comunidade académica e ao público geral
                                    </p>
                                </div>
                            </div>
                            <p className="noticias-categoria"><strong>Saúde Mental</strong></p>
                        </div>

                        {/* Slide 2 */}
                        <div className={`carrossel-item ${currentSlide === 1 ? "active" : ""}`}>
                            <div className="grid-titulo-data">
                                <div className="grid-titulo"><h3>Formação “Melhorias a Linha de Saúde Açores”</h3></div>
                                <div className="grid-data"><h3>15 de Fevereiro de 2026</h3></div>
                            </div>
                            <div className="grid-noticias">
                                <div className="grid-box-imagem"><img src={palestra} alt="Formação" /></div>
                                <div className="grid-box-texto">
                                    <p>Profissionais da área da saúde participaram recentemente numa <strong>ação de
											formação dedicada à melhoria do funcionamento da Linha de Saúde Açores</strong>, com
											o objetivo de reforçar a qualidade do atendimento, otimizar os processos de
											triagem e garantir uma resposta mais eficaz às necessidades da população.<br/><br/>
											A iniciativa reuniu médicos, enfermeiros e técnicos de atendimento,
											abordando temas como comunicação clínica à distância, utilização de
											protocolos de triagem e gestão segura da informação clínica. Durante a
											sessão foram também apresentados exemplos de <strong>boas práticas no acompanhamento
											remoto de utentes</strong>.<br/><br/>
											O evento contou ainda com a colaboração de investigadores associados ao
											Centro Académico Clínico dos Açores (CACA), que apresentaram o <strong>trabalho
											desenvolvido na área da telemedicina.</strong>
                                    </p>
                                </div>
                            </div>
                            <p className="noticias-categoria"><strong>Telemedicina</strong></p>
                        </div>

                        {/* Slide 3 */}
                        <div className={`carrossel-item ${currentSlide === 2 ? "active" : ""}`}>
                            <div className="grid-titulo-data">
                                <div className="grid-titulo"><h3>Participação no “International Epidemiology Conference”</h3></div>
                                <div className="grid-data"><h3>8 de Janeiro de 2026</h3></div>
                            </div>
                            <div className="grid-noticias">
                                <div className="grid-box-imagem"><img src={poster} alt="Poster" /></div>
                                <div className="grid-box-texto">
                                    <p>     
                                            A investigadora Joana Cabral, associada ao Centro Académico Clínico dos Açores (CACA),
											participou recentemente num congresso internacional dedicado às doenças
											neurológicas raras, onde apresentou <strong>novos dados sobre a epidemiologia da
											Doença de Machado-Joseph no arquipélago.</strong><br/><br/>
											Durante a apresentação foram discutidas estatísticas recentes que <strong>confirmam
											os Açores como uma das regiões do mundo com maior prevalência desta doença
											genética</strong>, estimada em cerca de 39 casos por 100 mil habitantes.<br/><br/>
											A participação no congresso permitiu divulgar o <strong>trabalho desenvolvido no
											âmbito da área de epidemiologia do CACA</strong>.
                                    </p>
                                </div>
                            </div>
                            <p className="noticias-categoria"><strong>Epidemiologia</strong></p>
                        </div>
                    </div>
                </div>
                <button className="carrossel-btn next" aria-label="Notícia seguinte" onClick={nextSlide}>  ❯  </button>
                <div className="carrossel-indicadores">
                    {[0, 1, 2].map(idx => (
                        <span key={idx} className={`indicador ${currentSlide === idx ? "active" : ""}`} onClick={() => goToSlide(idx)} />
                    ))}
                </div>
            </div>

            <div className="newsletter-container">
                <div className="newsletter-logotipo3d">
                    <div id="dna-container" ref={dnaContainerRef}></div>
                </div>
                <div className="newsletter-formulario">
                    <h3>Subscreva a nossa newsletter!</h3>
                    <form onSubmit={handleNewsletterSubmit}>
                        <input type="email" placeholder="  📧 Insira o seu e-mail aqui" className="email_newsletter" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required />
                        <select className="pais_selector" value={newsletterPais} onChange={e => setNewsletterPais(e.target.value)} required>
                            <option value="default">🏳️ Selecione o seu país</option>
                            {listaPaisesSimples.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                        </select>
                        <button type="submit" className="enviar_newsletter" disabled={isSubmitting}>{isSubmitting ? "A subscrever..." : "Subscrever"}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}