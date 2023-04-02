'use strict'

export default function showMore(btn, container, openned) {
  btn.addEventListener('click', () => {
    container.classList.toggle('card-list--active')
    btn.classList.toggle('slider-btn--active')
    if (!openned) {
      btn.textContent = 'Скрыть'
      return (openned = true)
    } else if (openned) {
      btn.textContent = 'Показать все'
      return (openned = false)
    }
  })
}
