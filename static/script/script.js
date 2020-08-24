'use strict';

// slider
/* Индекс слайда по умолчанию */
let slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".item");
    let dots = document.querySelectorAll(".slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

let nextSlide = document.querySelector('.next'),
    prevSlide = document.querySelector('.prev');


nextSlide.addEventListener('click', plusSlide);
prevSlide.addEventListener('click', minusSlide);

// end slider

// блок отпраки рассылки

let nameInp = document.querySelectorAll('input')[0],
    mailInp = document.querySelectorAll('input')[1],
    subscribeBtn = document.querySelectorAll('button')[0],
    submitBtn = document.querySelectorAll('button')[1],
    form = document.querySelector('form');


//всплывающее окно с кнопки для раскрытия меню рассылки

form.hidden = true;
subscribeBtn.addEventListener('click', () => {

    if (form.hidden == true) {
        form.hidden = false;
        let footerLink = document.querySelector('.credits');
        footerLink.style.marginTop = '20%';
    } else {
        form.hidden = true;
        let footerLink = document.querySelector('.credits');
        footerLink.style.marginTop = '4%';
    }

});

//окно для рассылки новостей
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let trimName = nameInp.value.trim(),
        trimMail = mailInp.value.trim();

    //вадилация мейла?
    if (trimName == '' && trimMail == '' && trimName != null && trimMail != null
    && trimName.length < 32 && trimMail.length < 32) {
        let error = document.createElement('p');
        error.className = 'error';
        error.innerHTML = '<span>Ошибка!</span> Нужно заполнить все поля правильно.';
        form.append(error);
        nameInp.value = '';
        mailInp.value = '';
    } else {
        console.log(nameInp.value, mailInp.value);
        let success = document.createElement('p');
        success.className = 'success';
        success.innerHTML = '<span>Спасибо за подписку!</span> Теперь Вам будут прихоидть уведомления о новых статьях!'
        form.append(success);
        nameInp.value = '';
        mailInp.value = '';
    }


});

