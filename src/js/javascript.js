document.addEventListener('DOMContentLoaded', function () {
    fecharMenuHamburger();
    botaoTopo();

});


function fecharMenuHamburger() {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function () {
            document.getElementById('menu-toggle').checked = false;
        });
    });
}

function botaoTopo() {
    const btn = document.getElementById('toTop');

    function updateVisibility() {
        btn.hidden = window.scrollY <= 300;
    }
    window.addEventListener('scroll', updateVisibility);
    updateVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}