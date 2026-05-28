import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Contactos.css";

const eEmailValido = (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,3}$/;
	return emailRegex.test(email.trim());
};

const validarTelemovelPorPais = (telemovel, indicativo) => {
	const apenasNumeros = /^\d+$/.test(telemovel);
	if (!apenasNumeros) {
		return { valido: false, mensagem: "Insira apenas números (sem espaços, letras ou caracteres especiais)!" };
	}
	const validacoes = {
		"+351": /^9[1236][0-9]{7}$/,
		"+33": /^[67][0-9]{8}$/,
		"+44": /^7[0-9]{9}$/,
		"+34": /^[67][0-9]{8}$/,
		"+49": /^1[5-7][0-9]{8}$/,
	};
	const pattern = validacoes[indicativo];
	if (pattern) {
		if (!pattern.test(telemovel)) {
			const mensagens = {
				"+351": "Número inválido. Deve ter 9 dígitos e começar com 9",
				"+33": "Número inválido. Deve ter 9 dígitos e começar com 6 ou 7",
				"+44": "Número inválido. Deve ter 10 dígitos e começar com 7",
				"+34": "Número inválido. Deve ter 9 dígitos e começar com 6 ou 7",
				"+49": "Número inválido. Deve ter 10 dígitos e começar com 15, 16 ou 17",
			};
			return { valido: false, mensagem: mensagens[indicativo] };
		}
		return { valido: true, mensagem: "" };
	}
	if (telemovel.length < 6) {
		return { valido: false, mensagem: "Número inválido. Deve ter pelo menos 6 dígitos." };
	}
	return { valido: true, mensagem: "" };
};

const validarDadosContacto = (dados) => {
	const erros = {};
	if (!dados.nome) erros.nome = "Nome é obrigatório";
	if (!dados.email) {
		erros.email = "Email é obrigatório";
	} else if (!eEmailValido(dados.email)) {
		erros.email = "Email inválido (precisa ter @ e .)";
	}
	if (!dados.telemovel) {
		erros.telemovel = "Número de telemóvel é obrigatório";
	} else {
		const validacao = validarTelemovelPorPais(dados.telemovel, dados.indicativo);
		if (!validacao.valido) erros.telemovel = validacao.mensagem;
	}
	if (!dados.assunto || dados.assunto === "default") erros.assunto = "Assunto é obrigatório";
	if (!dados.mensagem) erros.mensagem = "Mensagem é obrigatória";
	return { valido: Object.keys(erros).length === 0, erros };
};

const indicativosTelefone = [
	{ code: "+351", flag: "🇵🇹" },
	{ code: "+93", flag: "🇦🇫" }, { code: "+355", flag: "🇦🇱" }, { code: "+213", flag: "🇩🇿" },
	{ code: "+376", flag: "🇦🇩" }, { code: "+244", flag: "🇦🇴" }, { code: "+1264", flag: "🇦🇮" },
	{ code: "+1268", flag: "🇦🇬" }, { code: "+54", flag: "🇦🇷" }, { code: "+374", flag: "🇦🇲" },
	{ code: "+297", flag: "🇦🇼" }, { code: "+61", flag: "🇦🇺" }, { code: "+43", flag: "🇦🇹" },
	{ code: "+994", flag: "🇦🇿" }, { code: "+1242", flag: "🇧🇸" }, { code: "+973", flag: "🇧🇭" },
	{ code: "+880", flag: "🇧🇩" }, { code: "+1246", flag: "🇧🇧" }, { code: "+375", flag: "🇧🇾" },
	{ code: "+32", flag: "🇧🇪" }, { code: "+501", flag: "🇧🇿" }, { code: "+229", flag: "🇧🇯" },
	{ code: "+1441", flag: "🇧🇲" }, { code: "+975", flag: "🇧🇹" }, { code: "+591", flag: "🇧🇴" },
	{ code: "+387", flag: "🇧🇦" }, { code: "+267", flag: "🇧🇼" }, { code: "+55", flag: "🇧🇷" },
	{ code: "+673", flag: "🇧🇳" }, { code: "+359", flag: "🇧🇬" }, { code: "+226", flag: "🇧🇫" },
	{ code: "+257", flag: "🇧🇮" }, { code: "+855", flag: "🇰🇭" }, { code: "+237", flag: "🇨🇲" },
	{ code: "+1", flag: "🇨🇦" }, { code: "+238", flag: "🇨🇻" }, { code: "+1345", flag: "🇰🇾" },
	{ code: "+236", flag: "🇨🇫" }, { code: "+235", flag: "🇹🇩" }, { code: "+56", flag: "🇨🇱" },
	{ code: "+86", flag: "🇨🇳" }, { code: "+57", flag: "🇨🇴" }, { code: "+269", flag: "🇰🇲" },
	{ code: "+242", flag: "🇨🇬" }, { code: "+682", flag: "🇨🇰" }, { code: "+506", flag: "🇨🇷" },
	{ code: "+225", flag: "🇨🇮" }, { code: "+385", flag: "🇭🇷" }, { code: "+53", flag: "🇨🇺" },
	{ code: "+599", flag: "🇨🇼" }, { code: "+357", flag: "🇨🇾" }, { code: "+420", flag: "🇨🇿" },
	{ code: "+45", flag: "🇩🇰" }, { code: "+253", flag: "🇩🇯" }, { code: "+1767", flag: "🇩🇲" },
	{ code: "+1809", flag: "🇩🇴" }, { code: "+593", flag: "🇪🇨" }, { code: "+20", flag: "🇪🇬" },
	{ code: "+503", flag: "🇸🇻" }, { code: "+240", flag: "🇬🇶" }, { code: "+291", flag: "🇪🇷" },
	{ code: "+372", flag: "🇪🇪" }, { code: "+268", flag: "🇸🇿" }, { code: "+251", flag: "🇪🇹" },
	{ code: "+500", flag: "🇫🇰" }, { code: "+298", flag: "🇫🇴" }, { code: "+679", flag: "🇫🇯" },
	{ code: "+358", flag: "🇫🇮" }, { code: "+33", flag: "🇫🇷" }, { code: "+594", flag: "🇬🇫" },
	{ code: "+689", flag: "🇵🇫" }, { code: "+241", flag: "🇬🇦" }, { code: "+220", flag: "🇬🇲" },
	{ code: "+995", flag: "🇬🇪" }, { code: "+49", flag: "🇩🇪" }, { code: "+233", flag: "🇬🇭" },
	{ code: "+350", flag: "🇬🇮" }, { code: "+30", flag: "🇬🇷" }, { code: "+299", flag: "🇬🇱" },
	{ code: "+1473", flag: "🇬🇩" }, { code: "+590", flag: "🇬🇵" }, { code: "+1671", flag: "🇬🇺" },
	{ code: "+502", flag: "🇬🇹" }, { code: "+224", flag: "🇬🇳" }, { code: "+245", flag: "🇬🇼" },
	{ code: "+592", flag: "🇬🇾" }, { code: "+509", flag: "🇭🇹" }, { code: "+504", flag: "🇭🇳" },
	{ code: "+852", flag: "🇭🇰" }, { code: "+36", flag: "🇭🇺" }, { code: "+354", flag: "🇮🇸" },
	{ code: "+91", flag: "🇮🇳" }, { code: "+62", flag: "🇮🇩" }, { code: "+98", flag: "🇮🇷" },
	{ code: "+964", flag: "🇮🇶" }, { code: "+353", flag: "🇮🇪" }, { code: "+972", flag: "🇮🇱" },
	{ code: "+39", flag: "🇮🇹" }, { code: "+1876", flag: "🇯🇲" }, { code: "+81", flag: "🇯🇵" },
	{ code: "+962", flag: "🇯🇴" }, { code: "+7", flag: "🇰🇿" }, { code: "+254", flag: "🇰🇪" },
	{ code: "+686", flag: "🇰🇮" }, { code: "+383", flag: "🇽🇰" }, { code: "+965", flag: "🇰🇼" },
	{ code: "+996", flag: "🇰🇬" }, { code: "+856", flag: "🇱🇦" }, { code: "+371", flag: "🇱🇻" },
	{ code: "+961", flag: "🇱🇧" }, { code: "+266", flag: "🇱🇸" }, { code: "+231", flag: "🇱🇷" },
	{ code: "+218", flag: "🇱🇾" }, { code: "+423", flag: "🇱🇮" }, { code: "+370", flag: "🇱🇹" },
	{ code: "+352", flag: "🇱🇺" }, { code: "+853", flag: "🇲🇴" }, { code: "+261", flag: "🇲🇬" },
	{ code: "+265", flag: "🇲🇼" }, { code: "+60", flag: "🇲🇾" }, { code: "+960", flag: "🇲🇻" },
	{ code: "+223", flag: "🇲🇱" }, { code: "+356", flag: "🇲🇹" }, { code: "+692", flag: "🇲🇭" },
	{ code: "+596", flag: "🇲🇶" }, { code: "+222", flag: "🇲🇷" }, { code: "+230", flag: "🇲🇺" },
	{ code: "+52", flag: "🇲🇽" }, { code: "+691", flag: "🇫🇲" }, { code: "+373", flag: "🇲🇩" },
	{ code: "+377", flag: "🇲🇨" }, { code: "+976", flag: "🇲🇳" }, { code: "+382", flag: "🇲🇪" },
	{ code: "+1664", flag: "🇲🇸" }, { code: "+212", flag: "🇲🇦" }, { code: "+258", flag: "🇲🇿" },
	{ code: "+95", flag: "🇲🇲" }, { code: "+264", flag: "🇳🇦" }, { code: "+674", flag: "🇳🇷" },
	{ code: "+977", flag: "🇳🇵" }, { code: "+31", flag: "🇳🇱" }, { code: "+687", flag: "🇳🇨" },
	{ code: "+64", flag: "🇳🇿" }, { code: "+505", flag: "🇳🇮" }, { code: "+227", flag: "🇳🇪" },
	{ code: "+234", flag: "🇳🇬" }, { code: "+683", flag: "🇳🇺" }, { code: "+672", flag: "🇳🇫" },
	{ code: "+850", flag: "🇰🇵" }, { code: "+389", flag: "🇲🇰" }, { code: "+47", flag: "🇳🇴" },
	{ code: "+968", flag: "🇴🇲" }, { code: "+92", flag: "🇵🇰" }, { code: "+680", flag: "🇵🇼" },
	{ code: "+970", flag: "🇵🇸" }, { code: "+507", flag: "🇵🇦" }, { code: "+675", flag: "🇵🇬" },
	{ code: "+595", flag: "🇵🇾" }, { code: "+51", flag: "🇵🇪" }, { code: "+63", flag: "🇵🇭" },
	{ code: "+48", flag: "🇵🇱" }, { code: "+1787", flag: "🇵🇷" }, { code: "+974", flag: "🇶🇦" },
	{ code: "+262", flag: "🇷🇪" }, { code: "+40", flag: "🇷🇴" }, { code: "+7", flag: "🇷🇺" },
	{ code: "+250", flag: "🇷🇼" }, { code: "+590", flag: "🇧🇱" }, { code: "+1869", flag: "🇰🇳" },
	{ code: "+1758", flag: "🇱🇨" }, { code: "+590", flag: "🇲🇫" }, { code: "+508", flag: "🇵🇲" },
	{ code: "+1784", flag: "🇻🇨" }, { code: "+685", flag: "🇼🇸" }, { code: "+378", flag: "🇸🇲" },
	{ code: "+239", flag: "🇸🇹" }, { code: "+966", flag: "🇸🇦" }, { code: "+221", flag: "🇸🇳" },
	{ code: "+381", flag: "🇷🇸" }, { code: "+248", flag: "🇸🇨" }, { code: "+232", flag: "🇸🇱" },
	{ code: "+65", flag: "🇸🇬" }, { code: "+421", flag: "🇸🇰" }, { code: "+386", flag: "🇸🇮" },
	{ code: "+677", flag: "🇸🇧" }, { code: "+252", flag: "🇸🇴" }, { code: "+27", flag: "🇿🇦" },
	{ code: "+82", flag: "🇰🇷" }, { code: "+211", flag: "🇸🇸" }, { code: "+34", flag: "🇪🇸" },
	{ code: "+94", flag: "🇱🇰" }, { code: "+249", flag: "🇸🇩" }, { code: "+597", flag: "🇸🇷" },
	{ code: "+46", flag: "🇸🇪" }, { code: "+41", flag: "🇨🇭" }, { code: "+963", flag: "🇸🇾" },
	{ code: "+886", flag: "🇹🇼" }, { code: "+992", flag: "🇹🇯" }, { code: "+255", flag: "🇹🇿" },
	{ code: "+66", flag: "🇹🇭" }, { code: "+670", flag: "🇹🇱" }, { code: "+228", flag: "🇹🇬" },
	{ code: "+690", flag: "🇹🇰" }, { code: "+676", flag: "🇹🇴" }, { code: "+1868", flag: "🇹🇹" },
	{ code: "+216", flag: "🇹🇳" }, { code: "+90", flag: "🇹🇷" }, { code: "+993", flag: "🇹🇲" },
	{ code: "+1649", flag: "🇹🇨" }, { code: "+688", flag: "🇹🇻" }, { code: "+256", flag: "🇺🇬" },
	{ code: "+380", flag: "🇺🇦" }, { code: "+971", flag: "🇦🇪" }, { code: "+44", flag: "🇬🇧" },
	{ code: "+1", flag: "🇺🇸" }, { code: "+598", flag: "🇺🇾" }, { code: "+998", flag: "🇺🇿" },
	{ code: "+678", flag: "🇻🇺" }, { code: "+58", flag: "🇻🇪" }, { code: "+84", flag: "🇻🇳" },
	{ code: "+681", flag: "🇼🇫" }, { code: "+967", flag: "🇾🇪" }, { code: "+260", flag: "🇿🇲" },
	{ code: "+263", flag: "🇿🇼" }
];

export default function Contactos() {
	const [formData, setFormData] = useState({
		nome: "",
		email: "",
		telemovel: "",
		indicativo: "+351",
		assunto: "default",
		mensagem: "",
	});
	const [errors, setErrors] = useState({});
	const [toast, setToast] = useState({ message: "", type: "" });

	const mensagensPredefinidas = {
		default: "",
		opt1: "Solicito informações sobre o Centro Académico Clínico dos Açores, nomeadamente sobre os projetos em curso na área de investigação [descrição].",
		opt2: "Venho apresentar uma proposta de parceria/colaboração com o Centro Académico Clínico dos Açores. Estou disponível para uma reunião.",
		opt3: "Venho manifestar interesse no recrutamento para [descrição].",
		opt4: "Manifesto interesse em participar no evento/seminário [descrição].",
		opt5: "Apresento a seguinte sugestão/reclamação: [descrição].",
		opt6: "",
	};

	useEffect(() => {
		if (toast.message) {
			const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
	};

	const handleIndicativoChange = (e) => {
		setFormData((prev) => ({ ...prev, indicativo: e.target.value }));
		if (errors.telemovel) setErrors((prev) => ({ ...prev, telemovel: "" }));
	};

	const handleAssuntoChange = (e) => {
		const assunto = e.target.value;
		setFormData((prev) => ({
			...prev,
			assunto,
			mensagem: mensagensPredefinidas[assunto] || "",
		}));
		if (errors.assunto) setErrors((prev) => ({ ...prev, assunto: "" }));
		if (errors.mensagem) setErrors((prev) => ({ ...prev, mensagem: "" }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const resultado = validarDadosContacto(formData);
		if (!resultado.valido) {
			setErrors(resultado.erros);
			setToast({ message: "Por favor corrija os erros no formulário.", type: "error" });
			return;
		}
		try {
			// Enviar para o backend
			await axios.post('/api/contact', {
				nome: formData.nome,
				email: formData.email,
				telemovel: formData.telemovel,
				indicativo: formData.indicativo,
				assunto: formData.assunto,
				mensagem: formData.mensagem
			});
			setToast({ message: "Mensagem enviada com sucesso!", type: "success" });
			// Limpar formulário
			setFormData({
				nome: "",
				email: "",
				telemovel: "",
				indicativo: "+351",
				assunto: "default",
				mensagem: "",
			});
			setErrors({});
		} catch (err) {
			console.error(err);
			setToast({ message: "Erro ao enviar mensagem. Tente novamente.", type: "error" });
		}
	};

	return (
		<section id="contactos" className="contactos" tabIndex="0">
			<h1 id="titulo-contactos">Contactos</h1>

			<div className="contactos-container">
				<div className="contacto-mapa">
					<iframe
						src="https://www.google.com/maps?q=Universidade+dos+Açores+Ponta+Delgada&output=embed"
						title="Mapa da Universidade dos Açores em Ponta Delgada"
						aria-label="Mapa mostrando a localização da Universidade dos Açores"
					></iframe>
				</div>

				<div className="contacto-info">
					<h4>📍 Morada:</h4>
					<p>Centro Académico Clínico dos Açores</p>
					<p>Universidade dos Açores</p>
					<p>Campus Universitário de Ponta Delgada</p>
					<p>9500-018 Ponta Delgada</p>
					<p>Ilha de São Miguel - Açores - Portugal</p>
					<br /><br />
					<h4>📞 Telefone:</h4>
					<p>(+351) 296 650 000</p>
					<br /><br />
					<h4>📧 Email:</h4>
					<a href="mailto:caca@uac.pt" aria-label="Enviar e-mail para caca@uac.pt">caca@uac.pt</a>
				</div>

				<div className="contacto-form">
					<h4>Contacte-nos:</h4>
					<form aria-label="Formulário de contacto" onSubmit={handleSubmit}>
						{/* Nome */}
						<input
							type="text"
							placeholder="Nome Completo"
							className="nome_contacto"
							id="nome"
							aria-label="Nome completo"
							value={formData.nome}
							onChange={handleInputChange}
						/>
						<div className="mensagem-erro" style={{ visibility: errors.nome ? "visible" : "hidden" }}>
							{errors.nome || ""}
						</div>

						{/* Email */}
						<input
							type="email"
							placeholder="Email"
							className="email_contacto"
							id="email"
							aria-label="Endereço de e-mail"
							value={formData.email}
							onChange={handleInputChange}
						/>
						<div className="mensagem-erro" style={{ visibility: errors.email ? "visible" : "hidden" }}>
							{errors.email || ""}
						</div>

						{/* Grupo Telemóvel */}
						<div className="telemovel-group">
							<select
								aria-label="País de residência"
								className="indicativo_contacto"
								value={formData.indicativo}
								onChange={handleIndicativoChange}
								required
							>
								{indicativosTelefone.map((item) => (
									<option key={item.code} value={item.code}>
										{item.flag} {item.code}
									</option>
								))}
							</select>
							<input
								type="tel"
								placeholder="Número de Telemóvel"
								className="telemovel_contacto"
								id="telemovel"
								value={formData.telemovel}
								onChange={handleInputChange}
							/>
						</div>
						<div
							className="mensagem-erro"
							style={{
								visibility: errors.telemovel ? "visible" : "hidden",
								marginLeft: "107px",
							}}
						>
							{errors.telemovel || ""}
						</div>

						{/* Assunto */}
						<select
							className="assunto_contacto"
							id="assunto"
							aria-label="Assunto da mensagem"
							value={formData.assunto}
							onChange={handleAssuntoChange}
						>
							<option value="default">Selecione um assunto</option>
							<option value="opt1">Pedido de informações</option>
							<option value="opt2">Proposta de parceria/colaboração</option>
							<option value="opt3">Informações sobre oportunidades</option>
							<option value="opt4">Participação em eventos/seminários</option>
							<option value="opt5">Sugestão/Reclamação</option>
							<option value="opt6">Outro Assunto</option>
						</select>
						<div className="mensagem-erro" style={{ visibility: errors.assunto ? "visible" : "hidden" }}>
							{errors.assunto || ""}
						</div>

						{/* Mensagem */}
						<textarea
							placeholder="Mensagem"
							className="mensagem_contacto"
							id="mensagem"
							aria-label="Conteúdo da mensagem"
							value={formData.mensagem}
							onChange={handleInputChange}
						/>
						<div className="mensagem-erro" style={{ visibility: errors.mensagem ? "visible" : "hidden" }}>
							{errors.mensagem || ""}
						</div>

						<button type="submit" className="enviar">Enviar mensagem</button>
					</form>
				</div>
			</div>
			{toast.message && <div className={`toast ${toast.type}`}>{toast.message}</div>}
		</section>
	);
}