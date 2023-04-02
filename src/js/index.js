'use strict'

import '../scss/style.scss'
import showMore from './btn-show-more'
import Swiper, { Pagination } from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
  let init = false,
    opennedManufactors = false,
    oppenedTypes = false,
    menuOppened = false,
    modalOppened = false,
    swiper = Swiper

  const buttonShowMore = document.querySelector('.slider-btn'),
    sliderContainer = document.querySelector('.card-list'),
    burgerBtn = document.querySelector('.header__burger'),
    closeBtn = document.querySelector('.menu__close-button'),
    headerContainer = document.querySelector('.header'),
    headerNavContainer = document.querySelector('.header-nav'),
    hiddenClass = 'menu--hidden',
    activeClass = 'menu--active',
    menuDynamicElementsList = document.querySelectorAll('.menu--hidden'),
    callBtn = document.getElementById('openCall'),
    callModal = document.getElementById('call'),
    callCloseModal = document.getElementById('callClose'),
    feedbackBtn = document.getElementById('openFeedback'),
    feedbackModal = document.getElementById('feedback'),
    feedbackCloseModal = document.getElementById('feedbackClose'),
    btnShowMoreTypes = document.querySelector('[data-slider]'),
    sliderContainerTypes = document.querySelector('.swiper-types')

  function sliderInit() {
    if (window.innerWidth <= 767) {
      if (!init) {
        swiper = new Swiper('.swiper', {
          modules: [Pagination],
          direction: 'horizontal',
          loop: true,
          slidesPerView: 1.3,
          spaceBetween: 16,
          grabCursor: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
        init = true
      }
    } else if (init) {
      swiper.destroy()
      init = false
    }
  }

  function resizeFix(closeBtn, hiddenClass, menuList) {
    if (window.innerWidth >= 1119) {
      menuList.forEach((element) => {
        element.classList.remove(hiddenClass)
      })
      closeBtn.classList.add(hiddenClass)
    } else if (window.innerWidth <= 1119) {
      menuList.forEach((element) => {
        element.classList.add(hiddenClass)
      })
    }
  }

  function menuOpen(
    burgerBtn,
    closeBtn,
    hiddenClass,
    activeClass,
    header,
    nav,
    menuList
  ) {
    resizeFix(closeBtn, hiddenClass, menuList)
    burgerBtn.addEventListener('click', () => {
      menuList.forEach((el) => {
        el.classList.remove(hiddenClass)
        el.classList.add(activeClass)
        header.classList.add(activeClass)
        nav.classList.add(activeClass)
        burgerBtn.classList.add(hiddenClass)
        document.body.style.overflow = 'hidden'
        document.body.classList.add(activeClass)
        menuOppened = true
      })
    })
    window.addEventListener('click', (e) => {
      console.log(e)
      if (menuOppened) {
        if (e.srcElement.parentElement === closeBtn || e.target === closeBtn) {
          menuList.forEach((el) => {
            el.classList.add(hiddenClass)
            el.classList.remove(activeClass)
            burgerBtn.classList.remove(hiddenClass)
            header.classList.remove(activeClass)
            nav.classList.remove(activeClass)
            document.body.removeAttribute('style')
            document.body.classList.remove(activeClass)
            menuOppened = false
          })
        }
      }
    })
  }

  function openModal(openBtn, modalContainer) {
    openBtn.addEventListener('click', () => {
      modalContainer.classList.add('modal--active')
      document.body.style.overflow = 'hidden'
      modalOppened = true
    })
  }

  function closeModal(closeBtn, modalContainer, modalOppened) {
    window.addEventListener('click', (e) => {
      if (modalOppened) {
        if (
          e.target === modalContainer ||
          e.srcElement.parentElement === closeBtn ||
          e.target === closeBtn
        ) {
          modalContainer.classList.remove('modal--active')
          document.body.removeAttribute('style')
          modalOppened = false
        }
      } else {
        modalOppened = true
      }
    })
  }

  showMore(buttonShowMore, sliderContainer, opennedManufactors)
  showMore(btnShowMoreTypes, sliderContainerTypes, oppenedTypes)
  sliderInit()
  window.addEventListener('resize', sliderInit)
  window.addEventListener('resize', () => {
    resizeFix(closeBtn, hiddenClass, menuDynamicElementsList)
  })
  menuOpen(
    burgerBtn,
    closeBtn,
    hiddenClass,
    activeClass,
    headerContainer,
    headerNavContainer,
    menuDynamicElementsList
  )
  openModal(callBtn, callModal)
  closeModal(callCloseModal, callModal, modalOppened)
  openModal(feedbackBtn, feedbackModal)
  closeModal(feedbackCloseModal, feedbackModal, modalOppened)
})
