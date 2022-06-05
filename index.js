Vue.createApp({
  data() {
    const desktopViewQuery = matchMedia('(min-width:992px)')
    return {
      desktopViewQuery,
      isDesktop: desktopViewQuery.matches,
      menuHidden: true,
      scrolledFromTop: false,
      timerMonths: '',
      timerDays: '',
      timerHours: '',
      timerMinutes: '',
      timerSeconds: '',
      timer: null,
      eventDate: moment('14-08-2022 16:00', 'DD-MM-YYYY HH:mm')
        .toDate()
        .getTime(),
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
    this.timer = setInterval(this.updateTimer, 60 * 1000)
    this.updateTimer()
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
    updateTimer() {
      const now = moment().toDate().getTime()
      const dur = moment.duration(this.eventDate - now, 'milliseconds')
      const months = dur.months()
      const days = dur.days()
      const hours = dur.hours()
      const minutes = dur.minutes()
      this.timerMonths = months
      this.timerDays = days
      this.timerHours = hours
      this.timerMinutes = minutes
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
