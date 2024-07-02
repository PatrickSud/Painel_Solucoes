// Função para mostrar a seção de conteúdo correspondente ao botão clicado
function showContent(sectionId) {
    // Seleciona todas as seções de conteúdo
    const sections = document.querySelectorAll('.content-section');
    
    // Itera sobre cada seção e remove a classe 'active'
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Adiciona a classe 'active' à seção correspondente ao botão clicado
    document.getElementById(sectionId).classList.add('active');
}
