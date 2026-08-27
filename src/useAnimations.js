import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 丝滑缓动函数
const EASE = 'power3.out'
const EASE_SOFT = 'power2.out'
const EASE_STRONG = 'expo.out'

export function useAnimations() {
  const heroRef = useRef(null)
  const worksRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const strengthsRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ========== 开场动画 Opening Animation ==========
      const openingTL = gsap.timeline({ defaults: { ease: EASE_STRONG } })

      // 初始状态
      gsap.set('.hero-title', { y: 80, opacity: 0, scale: 0.92 })
      gsap.set('.eyebrow', { y: 30, opacity: 0 })
      gsap.set('.hero-desc', { y: 40, opacity: 0 })
      gsap.set('.hero-actions > *', { y: 30, opacity: 0 })
      gsap.set('.hero-tech span', { x: -20, opacity: 0 })
      gsap.set('.hero-tech i', { scaleX: 0, opacity: 0 })
      gsap.set('.hero-top-right', { x: 40, opacity: 0 })
      gsap.set('.scroll-down', { y: 20, opacity: 0 })

      // 开场序列
      openingTL
        .to('.hero-title', {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: EASE_STRONG
        }, 0.3)
        .to('.eyebrow', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE
        }, 0.5)
        .to('.hero-desc', {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: EASE
        }, 0.7)
        .to('.hero-actions > *', {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: EASE
        }, 0.9)
        .to('.hero-tech span', {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: EASE_SOFT
        }, 1.1)
        .to('.hero-tech i', {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.06,
          ease: EASE_SOFT
        }, 1.15)
        .to('.hero-top-right', {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE
        }, 0.6)
        .to('.scroll-down', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: EASE_SOFT
        }, 1.4)

      // ========== 模块标题进场 Section Title Reveal ==========
      const sectionHeads = document.querySelectorAll('.section-head')
      sectionHeads.forEach(head => {
        const eyebrow = head.querySelector('.eyebrow')
        const title = head.querySelector('span')

        gsap.set(eyebrow, { x: -60, opacity: 0 })
        gsap.set(title, { y: 40, opacity: 0, scale: 0.95 })

        ScrollTrigger.create({
          trigger: head,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(eyebrow, {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: EASE_STRONG
            })
            gsap.to(title, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: EASE_STRONG,
              delay: 0.15
            })
          }
        })
      })

      // ========== 作品卡片 Stagger 进场 ==========
      const workCards = document.querySelectorAll('.work-card')
      gsap.set(workCards, { y: 60, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.works-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(workCards, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: EASE
          })
        }
      })

      // 作品封面图片 Reveal 效果
      const workCovers = document.querySelectorAll('.work-cover')
      workCovers.forEach(cover => {
        gsap.set(cover, { scale: 1.15, opacity: 0 })
        ScrollTrigger.create({
          trigger: cover,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(cover, {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: EASE_STRONG
            })
          }
        })
      })

      // ========== 项目卡片 Stagger 进场 ==========
      const projectCards = document.querySelectorAll('.project-card')
      gsap.set(projectCards, { y: 60, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(projectCards, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE
          })
        }
      })

      // ========== 关于我模块进场 ==========
      const aboutItems = document.querySelectorAll('.about-content > *')
      gsap.set(aboutItems, { y: 40, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.about-content',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(aboutItems, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: EASE
          })
        }
      })

      // 获奖区域进场
      const awardItems = document.querySelectorAll('.award-year')
      gsap.set(awardItems, { y: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.awards-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(awardItems, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: EASE
          })
        }
      })

      // ========== 能力卡片 Stagger 进场 ==========
      const strengthCards = document.querySelectorAll('.strength-card')
      gsap.set(strengthCards, { y: 50, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.strengths-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(strengthCards, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: EASE
          })
        }
      })

      // ========== 联系我模块进场 ==========
      const contactItems = document.querySelectorAll('.contact-content > *')
      gsap.set(contactItems, { y: 40, opacity: 0 })

      ScrollTrigger.create({
        trigger: '.contact-content',
        start: 'top 80%',
        onEnter: () => {
          gsap.to(contactItems, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE
          })
        }
      })

      // ========== 精选作品轮播进场 ==========
      const featuredSection = document.querySelector('.featured-works')
      if (featuredSection) {
        gsap.set(featuredSection, { y: 60, opacity: 0 })
        ScrollTrigger.create({
          trigger: featuredSection,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(featuredSection, {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: EASE_STRONG
            })
          }
        })
      }

      // ========== 图片 Parallax 效果 ==========
      const parallaxImages = document.querySelectorAll('.work-cover, .project-cover')
      parallaxImages.forEach(img => {
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return {
    heroRef,
    worksRef,
    projectsRef,
    aboutRef,
    strengthsRef,
    contactRef
  }
}
