'use strict'

/**
 * Самодельный слайдер, листающийся влево или вправо
 */
class Slider {
  slides = null;
  currentSlideIndex = 0;
  direction = true;
  action = null;
  outAction = null;
  sliding = false;
  classes = {
    true: {from: "fromRight", to: "toLeft"},
    false: {from: "fromLeft", to: "toRight"}
  };

  /**
   * Конструктор слайдера
   * @param selector {string} - селектор слайдера
   * @param direction {boolean} - направление сдвига
   */
  constructor(selector, direction) {
    this.slides = document.querySelectorAll(selector+ " .slide");
    this.direction = direction;
    this.next();
  }

  /**
   * Задает направление смены справа налево и листает
   */
  toLeft() {
    this.direction = true;
    this.next();
  }

  /**
   * Задает направление смены слева направо и листает
   */
  toRight() {
    this.direction = false;
    this.next();
  }

  /**
   * Обработка текущего "кадра"
   */
  next() {
    if (this.sliding) {
      this.finish();
      this.next();
      return;
    }

    this.sliding = true;

    // прогоняем текущий слайд
    for (let slide of this.slides) {
      slide.classList.remove("active");
    }

    this.slides[this.currentSlideIndex].classList.add(this.classes[this.direction].to);//("go-out");

    // через заданный интервал надо убить эффект ухода и прихода и "зафиксировать" новый активный
    if (this.outAction) clearTimeout(this.outAction);
    this.outAction = setTimeout((currentIndex) => {
      this.finish(currentIndex);
      //this.restart();
      this.next();
    }, 2000, this.currentSlideIndex);

    // добавим эффектный выход нового слайда
    this.slides[this.getNextIndex()].classList.add(this.classes[this.direction].from);//("go-in");
    this.currentSlideIndex = this.getNextIndex();
  }

  /**
   * Завершаем слайд
   * @param currentIndex - индекс слайда
   */
  finish(currentIndex = this.currentSlideIndex) {
    if (!this.action) clearTimeout(this.action);
    if (this.outAction) clearTimeout(this.outAction);

    // убираем везде, чтобы не было наслоения, если листаем кнопкой слайдера или через js
    for (let slide of this.slides) {
      slide.classList.remove(this.classes[true].to, this.classes[false].to);//("go-out");
    }
    for (let slide of this.slides) {
      slide.classList.remove(this.classes[true].from, this.classes[false].from);//("go-in");
    }

    // зафиксируем текущий активный слайд
    this.slides[this.getNextIndex(currentIndex)].classList.add("active");
    this.sliding = false;

  }

  /**
   * вычисляет индекс следующего слайда в зависимости от направления
   * @param currentIndex {number} - текущий слайд (индекс)
   * @returns {number}
   */
  getNextIndex(currentIndex = this.currentSlideIndex) {
    if (this.direction) {
      return (currentIndex + 1) % this.slides.length;
    } else {
      return currentIndex ? currentIndex - 1 : this.slides.length - 1;
    }
  }
}


