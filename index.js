Vue.createApp({
  data() {
    const desktopViewQuery = matchMedia('(min-width:992px)')
    return {
      desktopViewQuery,
      isDesktop: desktopViewQuery.matches,
      menuHidden: true,
      scrolledFromTop: false,
    }
  },
  mounted() {
    this.desktopViewQuery.addListener(() => {
      this.isDesktop = this.desktopViewQuery.matches
    })
    window.onscroll = () => {
      if (window.scrollY > window.screen.height - 200) {
        return (this.scrolledFromTop = true)
      }
      return (this.scrolledFromTop = false)
    }
  },
  computed: {
    menuAnim() {
      const duration = 0.2
      const height = this.menuHidden ? 'auto' : 0
      const anim = { duration, height, paused: true, ease: 'none' }
      return gsap.to('.header__menu', anim)
    },
  },
  methods: {
    toggleMenu() {
      this.menuAnim.restart()
    },
  },
  watch: {
    isDesktop() {
      if (this.isDesktop) this.menuHidden = true
    },
  },
}).mount('#top')

const swiper = new Swiper('.swiper', {
  freeMode: true,
  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
})
