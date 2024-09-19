window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#444';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

const introText = document.querySelector('.intro h1');
window.addEventListener('load', () => {
    introText.style.transform = 'translateY(0)';
});
