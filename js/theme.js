
let isDarkTheme = localStorage.getItem('theme') === 'dark'; 

function toggleTheme() {
    isDarkTheme = !isDarkTheme; 
    console.log("Текущая тема:", isDarkTheme ? "темная" : "светлая");
    updateTheme();
}


function updateTheme() {
    const body = document.body;
    const themeSections = document.querySelectorAll('.theme-section');
    const cardBodies = document.querySelectorAll('.card-body');
    const projectLinks = document.querySelectorAll('.theme-section a'); 
    const headings = document.querySelectorAll('.theme-section h3'); 
    const modalContent = document.querySelector('.modal-content');

    if (isDarkTheme) {
        body.classList.add('bg-dark', 'text-white');
        body.classList.remove('bg-light', 'text-dark');

        themeSections.forEach(section => {
            section.classList.add('bg-dark', 'text-white');
        });

        cardBodies.forEach(card => {
            card.classList.add('bg-dark', 'text-white');
        });

        projectLinks.forEach(link => {
            link.classList.add('text-white'); 
        });

        headings.forEach(heading => {
            heading.classList.remove('text-body'); 
            heading.classList.add('text-light'); 
        });

        body.classList.add('bg-dark', 'text-white');
        body.classList.remove('bg-light', 'text-dark');
        modalContent.classList.add('dark-theme'); 

        localStorage.setItem('theme', 'dark'); 
    } else {
        body.classList.add('bg-light', 'text-dark');
        body.classList.remove('bg-dark', 'text-white');

        themeSections.forEach(section => {
            section.classList.remove('bg-dark', 'text-white');
        });

        cardBodies.forEach(card => {
            card.classList.remove('bg-dark', 'text-white');
        });

        projectLinks.forEach(link => {
            link.classList.remove('text-white'); 
        });

        headings.forEach(heading => {
            heading.classList.remove('text-light'); 
            heading.classList.add('text-body'); 
        });

        body.classList.add('bg-light', 'text-dark');
        body.classList.remove('bg-dark', 'text-white');
        modalContent.classList.remove('dark-theme');

        localStorage.setItem('theme', 'light'); 
    }
}

