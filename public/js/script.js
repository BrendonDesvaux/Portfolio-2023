changeNavbarBackgroundOnScroll();
// vars
'use strict'
var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })

    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    })

    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);


        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
            return;
        }

    })
}

function changeNavbarBackgroundOnScroll() {
    var navbar = document.querySelector('nav');
    var lastScrollTop = 0;

    function handleScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('scrolled');
        } else {
            // Scrolling up
            navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
}
// Sélectionnez tous les champs d'entrée et les messages d'erreur
const inputFields = document.querySelectorAll('.input-field');
const errorMessages = document.querySelectorAll('.error-message');

// Ajoutez un écouteur d'événements à chaque champ d'entrée
inputFields.forEach((inputField) => {
    inputField.addEventListener('input', () => {
        validateInput(inputField);
    });
});

// Fonction pour valider un champ d'entrée spécifique
function validateInput(inputField) {
    inputFields.forEach((inputField) => {
        errorMessages.forEach((errorMessage) => {
            if (inputField.value === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
    });
}

function submitForm() {
    const csrfToken = document.querySelector('input[name="_csrf"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    // Vérifiez si les valeurs sont vides
    const inputFields = document.querySelectorAll('.input-field');
    validateInput(inputFields);

    // Vérifiez si des messages d'erreur sont affichés
    const errorMessages = document.querySelectorAll('.error-message');
    const hasErrors = Array.from(errorMessages).some((errorMessage) => errorMessage.style.display === 'block');
    if (hasErrors) {
        return;
    }

    // Effectuer une requête AJAX pour envoyer les données
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit-form');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Formulaire soumis avec succès !');
        } else {
            console.error('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };
    xhr.send(JSON.stringify({ name, email, message }));
}

function showMore() {
    const projects = document.querySelector(".projects");
    const btnSm = document.querySelector('#sm');

    if (projects.style.overflow === "visible") {
        // Si l'affichage est déjà étendu, réduisez-le
        projects.style.overflow = "hidden";
        projects.style.maxHeight = "37vh";
        btnSm.innerText = "Show More";
    } else {
        // Si l'affichage est réduit, déployez-le
        projects.style.overflow = "visible";
        projects.style.maxHeight = "100%";
        btnSm.innerText = "Show Less";
    }
}