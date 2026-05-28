import "./Footer.css"

import facebookLogo from "./media/fb.png"
import instagramLogo from "./media/ig.png"
import linkedinLogo from "./media/linkedIn.png"

export default function Footer() {
	return (
		<footer>
			<div className="footer_copyright">
				<p>CACA © 2026</p>
			</div>

			<div className="footer_socialmedia">
				<a href="https://facebook.com" target="_blank" aria-label="Facebook do CACA (abre nova página)">
					<img src={facebookLogo} alt=""></img>
				</a>
				<a href="https://instagram.com" target="_blank" aria-label="Instagram do CACA (abre nova página)">
					<img src={instagramLogo} alt=""></img>
				</a>
				<a href="https://linkedin.com" target="_blank" aria-label="LinkedIn do CACA (abre nova página)">
					<img src={linkedinLogo} alt=""></img>
				</a>
			</div>

			<div className="footer_course">
				<a href="https://www.uac.pt/" target="_blank" aria-label="Site da Universidade dos Açores (abre nova página)">
					<p>Universidade dos Açores</p>
				</a>
				<p>Tecnologias Web - 2025/2026</p>
			</div>

			<div className="footer_privacy">
				<a href="https://www.google.com/" target="_blank" aria-label="Política de Privacidade (abre nova página)">
					<p>Política de Privacidade</p>
				</a>
			</div>
		</footer>
	);
}