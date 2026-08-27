import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { ArrowDownRight, ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Grainient from './Grainient'
import BorderGlow from './BorderGlow'
import SplashCursor from './SplashCursor'
import DomeGallery from './DomeGallery'
import { useAnimations } from './useAnimations'

const projects = [
  {
    id: '01', tag: '个人独立开发 / 2025—2026', title: 'VR · 征途', text: '一款以沉浸式战斗为核心的 VR 独立游戏。从工程架构、战斗系统到性能优化，完成完整研发闭环。', type: 'journey',
    video: null, cover: '/works/vr-zhengtu/cover.webp', bvid: 'BV1oYhw6jEp3',
    sections: [
      { title: '模块框架设计', text: '项目里的整体游戏框架交互模块与组件解耦思路，控件部分以画质设置模块为例，主要以数据表格驱动，配合数据表生成不同画质设置的子控件来实现，实现的交互主要通过控制台命令来切换不同画质等级，它们对应都有自己的CMD命令。', image: '/projects/vr-zhengtu/framework.webp' },
      { title: 'AI系统', text: '主要通过数据表配置属性、Base角色基类管理机制、行为树做决策。好处是每个AI的数值和动画都不一样，但共用同一套逻辑。Base角色基类，所有AI都继承它。行为树主要根据和玩家的距离决定是保持距离、往后撤、还是往后闪避。再往下是普通攻击和技能攻击，没体力进入环绕模式——有大几率进入格挡状态开始环绕，同时穿插闪避。', image: '/projects/vr-zhengtu/ai.webp' },
      { title: '解耦组件', text: '制作的所有组件都集成到了插件中，以攻击检测组件为例，可以选择精细的攻击检测模块，和普通的检测。', image: '/projects/vr-zhengtu/decoupled.webp' },
      { title: '成果展示', text: '项目已完成核心玩法闭环开发，正在进行Steam商店页面筹备与最终优化，即将上架Steam平台面向全球玩家发售。', image: '/projects/vr-zhengtu/results.webp' }
    ]
  },
  {
    id: '02', tag: '学校 VR 项目 / 2024', title: 'VR · 下庄', text: '负责 VR 交互体验设计与实现，构建抓取、攀爬、爆炸触发和场景内 UI 交互。', type: 'village',
    video: null, cover: '/projects/xiazhuang/cover.webp', bvid: 'BV1HHhw6REpb',
    sections: [
      { title: '项目背景', text: '《下庄天路 VR》是以重庆巫山县下庄村村民在绝壁上凿出"天路"的真实事迹为原型，运用虚拟现实(VR)技术打造的沉浸式思政教育作品。该作品通过高度还原的交互体验，生动展现了下庄人民"不甘落后、不等不靠、不畏艰险、不怕牺牲"的奋斗精神，旨在以科技赋能红色教育，让学生身临其境地感悟新时代"愚公移山"的精神伟力。作品采用线性叙事结构，共分为三个章节：第一章初出茅庐，第二章愚公移山，第三章开天辟地。', image: '/projects/xiazhuang/bg.jpg' },
      { title: '交互设计', text: '项目还原1997年下庄修路历史，复刻村民依靠钢钎、铁锤、绳索绝壁开山的艰苦历程。为还原当年修路的惊险实景，设计悬崖峭壁凿石、攀爬等交互体验。', image: '/projects/xiazhuang/interaction.webp' },
      { title: '成果贡献', text: '项目入选九龙坡社区，作为终身教育红色宣传案例落地使用。', image: '/projects/xiazhuang/achievement.jpg' },
      { title: '参与比赛', text: '项目入选2025年重庆市职业技能大赛进行成果展示。', image: '/projects/xiazhuang/competition.jpg' }
    ]
  }
]

const works = [
  { id: 'W09', category: 'VR GAME', title: 'VR · 征途', desc: '使用UE5、VRE插件完成VR战斗原型开发，采用模块化、解耦的组件化思路，搭建VR枪械系统、背包系统、敌人AI体系。利用数据资产驱动配置，实现交互、攻击、特效逻辑分离，锻炼可复用功能模块的设计能力。', tags: ['VR', '独立游戏', '战斗系统', '性能优化', '模块化', '解耦式组件', '自制插件', 'VRE', '模块化UI', '数据表格'], hue: 'green', hasContent: true, link: null, cover: '/works/vr-zhengtu/cover.webp', bvid: 'BV1oYhw6jEp3', images: ['/projects/vr-zhengtu/framework.webp', '/projects/vr-zhengtu/ai.webp', '/projects/vr-zhengtu/decoupled.webp'] },
  { id: 'W03', category: 'HORROR FPS', title: '死寂', desc: '作品基于B站《死寂》TPS丧尸游戏案例进行学习，使用UE5蓝图实现FPS基础射击玩法。完成摄像机震动、武器基础反馈、命中表现等核心战斗体验功能，重点练习射击手感调优、相机控制相关功能。', tags: ['FPS', '恐怖', '氛围', '关卡设计', '音效'], hue: 'purple', hasContent: true, link: null, cover: '/works/siji/cover.webp', video: null, bvid: 'BV1J4hw6HEpe', images: ['/works/siji/shot1.webp', '/works/siji/shot2.webp', '/works/siji/shot3.webp'] },
  { id: 'W04', category: 'SIMULATION', title: '虚拟仿真汽车（PC）', desc: 'UE5 汽车虚拟仿真，构建高质感可视化展示场景。利用变体集（Variant Sets）实现车身多套材质快速切换；完成材质调校，还原金属、车漆的电质感光学表现，实现交互式车辆预览效果。', tags: ['UE5', '汽车仿真', '物理', 'PC', '交互'], hue: 'blue', hasContent: true, link: null, cover: '/works/pc-car/cover.webp', video: null, bvid: 'BV1f4hw6nEzp', images: ['/works/pc-car/shot1.webp', '/works/pc-car/shot2.webp', '/works/pc-car/shot3.webp'] },
  { id: 'W05', category: 'VR SIMULATION', title: 'VR 虚拟仿真汽车', desc: 'VR 端汽车虚拟仿真，沉浸式驾驶交互、手部追踪与真实物理反馈。', tags: ['VR', '汽车仿真', 'VRE', '物理', '交互'], hue: 'cyan', hasContent: true, link: 'https://www.bilibili.com/video/BV1vtHkzSEE2/?share_source=copy_web&vd_source=7a78e4526d22cf65270b6e364095030b', cover: '/works/vr-car/cover.webp' },
  { id: 'W07', category: 'VFX', title: 'UE 粒子特效合集', desc: 'UE Niagara粒子特效练习项目，制作战斗、法师法术等多款基础游戏特效。主要练习粒子参数调试蓝图控制修改，以提升资源交接协作能力。', tags: ['Niagara', '特效', 'VFX', '学习合集'], hue: 'yellow', hasContent: true, link: null, cover: '/works/vfx/cover.webp', video: null, bvid: 'BV1f4hw6nEM9', images: ['/works/vfx/shot1.webp', '/works/vfx/shot2.webp', '/works/vfx/shot3.webp'] },
  { id: 'W08', category: '3D ART', title: '《龙王》', desc: '龙王角色资产练习，AI辅助生成参考与高模，使用Maya、Warp3D、PT、PS完成拓扑UV贴图，仅耗时3天完成制作，该模型已在个人项目《VR征途》绑定骨骼使用。主要以提升与美术团队的交接协作能力为目的练习。', tags: ['Maya', 'ZBrush', 'PT', 'Warp4D', 'AI', '混元', 'UV', '贴图'], hue: 'gold', hasContent: true, link: null, cover: '/works/dragon-king/cover.webp', video: null, bvid: 'BV1f4hw6nEt6', images: ['/works/dragon-king/shot1.webp', '/works/dragon-king/shot2.webp', '/works/dragon-king/shot3.webp'] },
  { id: 'W01', category: 'GAMEPLAY', title: 'Gameplay俯视角生存建造联机', desc: '基于 GAS 的俯视角生存建造游戏，支持多人联机建造、资源采集与生存对抗。', tags: ['GAS', '建造', '联机', '生存', '网络同步', 'Gameplay', '能力组件', 'C++'], hue: 'green', cover: '/works/topdown/cover.webp' },
  { id: 'W10', category: 'VR PROJECT', title: 'VR · 下庄', desc: '负责 VR 交互体验设计与实现，构建抓取、攀爬、爆炸触发和场景内 UI 交互。', tags: ['VR', '交互', '学校项目'], hue: 'cyan', hasContent: true, link: null, cover: '/works/xiazhuang/cover.webp', video: null, bvid: 'BV1HHhw6REpb', images: ['/works/xiazhuang/shot1.webp', '/works/xiazhuang/shot2.webp', '/works/xiazhuang/shot3.webp'] },
  { id: 'W02', category: 'GAMEPLAY', title: 'UE Gameplay 联机战斗系统', desc: '完整的联机战斗框架，含连击、格挡、闪避、受击反馈与服务器权威同步。', tags: ['GAS', '战斗', '联机', 'Combo', 'Replication'], hue: 'orange' },
  { id: 'W06', category: 'CHARACTER', title: '角色高级运动系统', desc: '针对角色的高级运动系统教程，含 ALS 进阶、动画蓝图、状态切换与运动匹配。', tags: ['ALS', '运动系统', '动画', '角色', '教程'], hue: 'red' },
]

const featuredWorks = works.filter(w => ['W01', 'W09', 'W10'].includes(w.id))

const strengths = [
  ['01', '引擎与语言', '熟练使用 UE5 进行 C++ 与蓝图混合开发，具备针对虚幻引擎的独立 C++ 插件开发能力。'],
  ['02', '架构与组件化', '擅长将复杂需求解耦拆分，设计高内聚、低耦合的可复用功能组件，具备游戏系统框架与 UI 系统框架的设计实现能力，注重项目可维护性与迭代效率。'],
  ['03', 'GAS 技能系统', '运用 Gameplay Ability System 搭建完整技能体系，能自定义 Ability、Task、GameplayTag、Attribute，实现多段伤害、技能判定与状态控制，包含网络同步。'],
  ['04', '网络同步', '掌握 UE 客户端与服务器同步机制，熟悉服务端权威架构，运用蓝图或 C++ 实现 Actor 复制、Replicated 变量、RPC 调用、组播等，能处理联机战斗与物品同步。'],
  ['05', 'AI 系统', '熟练使用状态机、AI 控制器、AI 感知、行为树、状态树搭建 AI 逻辑，实现巡逻、追击、攻击、受击等完整行为状态切换。'],
  ['06', 'VR 开发', '具备 VR 游戏项目开发经验，熟悉 VR 交互、手部追踪及沉浸式玩法实现。'],
  ['07', '特效与美术', '掌握 Niagara 基础，能实现技能特效并与战斗伤害逻辑联动；具备 3D 建模基础，了解美术资产管线，可与美术高效对接。'],
  ['08', '版本控制', '熟练使用 Perforce(P4V) 进行团队协作开发，掌握工作区管理、代码与资产提交、分支策略与冲突解决；熟悉 UE 项目中二进制资产的版本管理流程，能在多人并行开发中保障代码与资源的安全合并与追溯。'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorHover, setCursorHover] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [activeWork, setActiveWork] = useState(null)
  const [detailWork, setDetailWork] = useState(null)
  const [detailProject, setDetailProject] = useState(null)
  const dragRef = useRef({ startX: 0, dragging: false, moved: false })

  // 高端动效系统
  useAnimations()

  useEffect(() => {
    const handleMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleOver = (e) => {
      if (e.target.closest('a, button, .carousel-card, .work-card, .project-card, .strength-card, input, textarea, select')) {
        setCursorHover(true)
      } else {
        setCursorHover(false)
      }
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [])

  const goCarousel = (dir) => {
    setCarouselIndex(prev => {
      const next = prev + dir
      if (next < 0) return featuredWorks.length - 1
      if (next >= featuredWorks.length) return 0
      return next
    })
  }

  const handleWorkClick = (w) => {
    if (w.hasContent) {
      if (w.link) {
        window.open(w.link, '_blank')
      } else {
        setDetailWork(w)
      }
    } else {
      setActiveWork(activeWork === w.id ? null : w.id)
    }
  }

  const onCarouselDown = (e) => {
    dragRef.current = { startX: e.clientX || e.touches?.[0]?.clientX || 0, dragging: true, moved: false }
  }
  const onCarouselMove = (e) => {
    if (!dragRef.current.dragging) return
    const x = e.clientX || e.touches?.[0]?.clientX || 0
    const diff = x - dragRef.current.startX
    if (Math.abs(diff) > 5) dragRef.current.moved = true
  }
  const onCarouselUp = (e) => {
    if (!dragRef.current.dragging) return
    const x = e.clientX || e.changedTouches?.[0]?.clientX || 0
    const diff = x - dragRef.current.startX
    if (Math.abs(diff) > 50) {
      goCarousel(diff > 0 ? -1 : 1)
    }
    dragRef.current.dragging = false
  }
  return <main>
    <div className={`custom-cursor-dot ${cursorHover ? 'hover' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
    <div className={`custom-cursor-ring ${cursorHover ? 'hover' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
    <Nav open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} onClose={() => setMenuOpen(false)} />
    <SplashCursor
      DENSITY_DISSIPATION={4}
      SPLAT_RADIUS={0.15}
      SPLAT_FORCE={5000}
      COLOR_UPDATE_SPEED={15}
      RAINBOW_MODE
    />
    <div className="page-bg">
      <Grainient
        color1="#6e5944"
        color2="#1a1922"
        color3="#516877"
        timeSpeed={0.3}
        colorBalance={0.01}
        warpStrength={0.65}
        warpFrequency={2.8}
        warpSpeed={6}
        warpAmplitude={12}
        blendAngle={0.0}
        blendSoftness={0.11}
        rotationAmount={500.0}
        noiseScale={0.35}
        grainAmount={0}
        grainScale={2.0}
        grainAnimated={false}
        contrast={1.5}
        gamma={1.0}
        saturation={0.8}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
    </div>
    <section className="hero" id="top">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/hero-cover.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-noise" />
      <div className="hero-noise-yellow" />
      <div className="grid-overlay" />

      <div className="hero-top-right">GAME CLIENT DEVELOPER</div>

      <div className="hero-content shell">
        <p className="eyebrow">UE ENGINEER · PORTFOLIO 2026</p>
        <h1 className="hero-title">叶浪森</h1>
        <p className="hero-desc">专注虚幻引擎开发，<br />让技术、规则与感受自然共振。</p>
        <div className="hero-actions">
          <BorderGlow className="btn-glow" backgroundColor="transparent" borderRadius={4} glowRadius={14} colors={['#c6ff32', '#a3e635', '#65a30d']}>
            <a className="cta-btn" href="#works">查看作品 <ArrowUpRight size={16} /></a>
          </BorderGlow>
          <BorderGlow className="btn-glow" backgroundColor="transparent" borderRadius={4} glowRadius={14} colors={['#c6ff32', '#7dd3fc', '#f0abfc']}>
            <a className="cta-mail" href="mailto:3462159749@qq.com"><Mail size={14} /> 3462159749@qq.com</a>
          </BorderGlow>
        </div>
      </div>

      <div className="hero-footer shell">
        <div className="hero-tech">
          <span>UE5</span><i/><span>C++</span><i/><span>GAS</span><i/><span>Netcode</span><i/><span>VR</span><i/><span>AI</span><i/><span>Niagara</span>
        </div>
      </div>

      <a className="scroll-down" href="#works" aria-label="向下滚动">
        <ArrowDownRight size={20} />
      </a>
    </section>

    <section className="works shell section" id="works">
      <div className="section-head"><p className="eyebrow">01 / SELECTED WORKS</p><span>个人作品</span></div>

      <div className="featured-works">
        <div className="featured-label">精选作品 · FEATURED WORKS</div>
        <div className="carousel"
          onMouseDown={onCarouselDown}
          onMouseMove={onCarouselMove}
          onMouseUp={onCarouselUp}
          onMouseLeave={onCarouselUp}
          onTouchStart={onCarouselDown}
          onTouchMove={onCarouselMove}
          onTouchEnd={onCarouselUp}
        >
          {featuredWorks.map((w, i) => {
            const offset = i - carouselIndex
            let cls = 'carousel-card hidden'
            if (offset === 0) cls = 'carousel-card active'
            else if (offset === -1 || offset === featuredWorks.length - 1) cls = 'carousel-card prev'
            else if (offset === 1 || offset === -(featuredWorks.length - 1)) cls = 'carousel-card next'
            return (
              <div className={cls} key={w.id} onClick={() => {
                if (dragRef.current.moved) return
                if (offset === 0) {
                  handleWorkClick(w)
                } else {
                  setCarouselIndex(i)
                }
              }}>
                <div className={`carousel-card-inner feat-${w.hue}`}>
                  {w.cover && <img src={w.cover} alt={w.title} className="carousel-cover" />}
                  <span className="carousel-cat">{w.category}</span>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <div className="carousel-tags">{w.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <div className={`work-overlay carousel-overlay ${activeWork === w.id ? 'show' : ''}`}>
                    <div className="work-overlay-text">
                      <span className="work-overlay-title">作品制作正在进行中</span>
                      <span className="work-overlay-desc">演示内容敬请期待</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <button className="carousel-arrow carousel-prev" onClick={(e) => { e.stopPropagation(); goCarousel(-1) }} aria-label="上一个">‹</button>
          <button className="carousel-arrow carousel-next" onClick={(e) => { e.stopPropagation(); goCarousel(1) }} aria-label="下一个">›</button>
        </div>
        <div className="carousel-dots">
          {featuredWorks.map((_, i) => (
            <button className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`} key={i} onClick={() => setCarouselIndex(i)} aria-label={`第${i + 1}个作品`}></button>
          ))}
        </div>
      </div>

      <div className="works-grid">
        {works.map((w) => (
          <BorderGlow key={w.id} className="card-glow" backgroundColor="transparent" borderRadius={4} glowRadius={16} colors={['#c6ff32', '#7dd3fc', '#f0abfc']}>
            <article className={`work-card work-${w.hue}`} onClick={() => handleWorkClick(w)}>
              <div className="work-visual">
                {w.cover ? <img src={w.cover} alt={w.title} className="work-cover" /> : (
                  <>
                    <div className="work-orb" />
                    <div className="work-lines" />
                  </>
                )}
                <span className="work-id">{w.id}</span>
                <span className="work-cat">{w.category}</span>
              </div>
              <div className="work-body">
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="work-tags">{w.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <div className={`work-overlay ${activeWork === w.id ? 'show' : ''}`}>
                <div className="work-overlay-text">
                  <span className="work-overlay-title">作品制作正在进行中</span>
                  <span className="work-overlay-desc">演示内容敬请期待</span>
                </div>
              </div>
            </article>
          </BorderGlow>
        ))}
      </div>
    </section>

    <section className="projects section" id="projects">
      <div className="shell"><div className="section-head"><p className="eyebrow">02 / SELECTED WORK</p><span>精选项目</span></div></div>
      <div className="project-list shell">{projects.map((project) => (
        <BorderGlow key={project.id} className="card-glow" backgroundColor="transparent" borderRadius={4} glowRadius={18} colors={['#c6ff32', '#7dd3fc', '#f0abfc']}>
          <article className={`project-card ${project.type}`} onClick={() => setDetailProject(project)}>
            <div className="card-art">
              {project.cover ? <img src={project.cover} alt={project.title} className="project-cover" /> : (
                <>
                  <div className="orb"/><div className="art-line line-a"/><div className="art-line line-b"/>
                </>
              )}
              <span>{project.id}</span>
            </div>
            <div className="project-info"><p className="eyebrow">{project.tag}</p><h3>{project.title}</h3><p>{project.text}</p><span className="project-arrow" aria-label={`查看${project.title}详情`}><ArrowUpRight size={24}/></span></div>
          </article>
        </BorderGlow>
      ))}</div>
    </section>

    <section className="about shell section" id="about">
      <div className="section-head"><p className="eyebrow">03 / ABOUT</p><span>个人经历</span></div>
      <div className="about-grid">
        <div className="portrait"><div className="portrait-glow" /><div className="portrait-mark">YL<br />S.</div><span>UE5<br />ENGINEER</span></div>
        <div className="about-copy">
          <h2>叶浪森<span>。</span></h2>
          <p className="lead">一名专注于虚幻引擎的开发者。我相信优秀的互动体验，来自严谨系统与直觉感受之间恰到好处的平衡。</p>
          <p>目前就读于重庆工商职业学院虚拟现实应用技术专业，可立即到岗实习。具备 VR 独立游戏全流程开发经验，也持续关注机器人仿真与具身智能。</p>
          <div className="contact-lines"><a href="tel:19122622462"><Phone size={16}/> 191 2262 2462</a><a href="mailto:3462159749@qq.com"><Mail size={16}/> 3462159749@qq.com</a></div>
        </div>
        <div className="data-stack">
          <div><b>02</b><span>完整项目经历</span></div><div><b>09<span>+</span></b><span>核心技术方向</span></div><div><b>09</b><span>竞赛奖项</span></div>
        </div>
      </div>
      <div className="awards">
        <p className="awards-label">荣誉奖项 / AWARDS</p>
        <div className="awards-grid">
          <div className="award-year">
            <span>2024</span>
            <ul>
              <li><em>银奖</em> 25届传媒与设计学院"数智创艺"毕业设计作品展</li>
              <li><em>二等奖</em> 全国职业院校艺术设计类优秀作品展 数字设计类</li>
            </ul>
          </div>
          <div className="award-year">
            <span>2025</span>
            <ul>
              <li><em>一等奖</em> 中国国际大学生创新大赛数字媒体学院选拔赛</li>
              <li><em>优秀奖</em> 中国国际大学生创新大赛校内选拔赛决赛</li>
              <li><em>三等奖</em> 重庆工商职业学院"AI+信息素养"大赛</li>
              <li><em>二等奖</em> 职业技能竞赛数字艺术设计大赛</li>
            </ul>
          </div>
          <div className="award-year">
            <span>2026</span>
            <ul>
              <li><em>二等奖</em> "巴渝工匠"杯重庆市第四届数字技能竞赛 虚拟现实产品设计师（学生组）</li>
              <li><em>一等奖</em> 首届"AI遇见非遗"学生主题活动 AI赋能非遗创意讲述</li>
              <li><em>银奖</em> 重庆市职业院校技能大赛艺术设计赛道 数字艺术设计</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="award-dome">
        <p className="awards-label">奖状实拍 / CERTIFICATES · 拖动旋转</p>
        <div className="dome-container">
          <DomeGallery
            images={[1,2,3,4,5,6,7,8].map(n => `/awards/award${n}.jpg`)}
            fit={0.55}
            minRadius={400}
            overlayBlurColor="#0a0b0d"
            grayscale={false}
            imageBorderRadius="10px"
            openedImageWidth="380px"
            openedImageHeight="520px"
            openedImageBorderRadius="12px"
          />
        </div>
      </div>
    </section>

    <section className="strengths shell section" id="strengths">
      <div className="section-head"><p className="eyebrow">04 / CAPABILITIES</p><span>个人能力</span></div>
      <div className="strength-grid">{strengths.map(([num, title, text]) => <article className="strength-card" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><i /></article>)}</div>
    </section>

    <footer id="contact">
      <div className="footer-light" />
      <div className="shell footer-content"><p className="eyebrow">05 / LET'S MAKE IT REAL</p><h2>下一段体验，<br /><em>携手团队打造更出色的作品。</em></h2><a className="mail-link" href="mailto:3462159749@qq.com">3462159749@qq.com <ArrowUpRight /></a><div className="footer-meta"><span>© 2026 YE LANGSEN</span><a href="https://github.com/" target="_blank" rel="noreferrer">↗ GitHub</a><a href="#top">BACK TO TOP ↑</a></div></div>
    </footer>
    {lightbox && (
      <div className="lightbox" onClick={() => setLightbox(null)}>
        <button className="lightbox-close" onClick={() => setLightbox(null)}><X size={24}/></button>
        <img src={lightbox} alt="奖状大图" onClick={e => e.stopPropagation()} />
      </div>
    )}
    {detailWork && (
      <div className="work-detail-modal" onClick={() => setDetailWork(null)}>
        <div className="work-detail-content" onClick={e => e.stopPropagation()}>
          <button className="work-detail-close" onClick={() => setDetailWork(null)}><X size={22}/></button>
          <div className="work-detail-header">
            <span className="work-detail-cat">{detailWork.category}</span>
            <h2>{detailWork.title}</h2>
          </div>
          <div className="work-detail-video">
            {detailWork.bvid ? (
              <iframe src={`//player.bilibili.com/player.html?bvid=${detailWork.bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`} className="detail-video-iframe" scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}></iframe>
            ) : detailWork.video ? (
              <video src={detailWork.video} controls poster={detailWork.cover} className="detail-video" />
            ) : (
              <div className="video-placeholder"><span>视频展示区</span></div>
            )}
          </div>
          <div className="work-detail-gallery">
            {detailWork.images ? detailWork.images.map((img, i) => (
              <div className="gallery-item gallery-image" key={i}><img src={img} alt={`截图 ${i+1}`} /></div>
            )) : (
              <>
                <div className="gallery-item"><span>图片 01</span></div>
                <div className="gallery-item"><span>图片 02</span></div>
                <div className="gallery-item"><span>图片 03</span></div>
              </>
            )}
          </div>
          <div className="work-detail-info">
            <div className="work-detail-desc">
              <h3>作品介绍</h3>
              <p>{detailWork.desc}</p>
            </div>
            <div className="work-detail-tags">
              <h3>技术标签</h3>
              <div className="tags-list">{detailWork.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    )}
    {detailProject && (
      <div className="project-detail-modal" onClick={() => setDetailProject(null)}>
        <div className="project-detail-content" onClick={e => e.stopPropagation()}>
          <button className="project-detail-close" onClick={() => setDetailProject(null)}><X size={22}/></button>
          
          {/* 视频区域 */}
          <div className="project-detail-video">
            {detailProject.bvid ? (
              <iframe src={`//player.bilibili.com/player.html?bvid=${detailProject.bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`} className="project-video-iframe" scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}></iframe>
            ) : detailProject.video ? (
              <video src={detailProject.video} controls poster={detailProject.cover} className="project-video-player" />
            ) : (
              <div className="project-video-placeholder">
                <span>项目视频展示区</span>
                <p>视频素材待上传</p>
              </div>
            )}
          </div>
          
          {/* 标题 */}
          <div className="project-detail-header">
            <span className="project-detail-tag">{detailProject.tag}</span>
            <h2>{detailProject.title}</h2>
          </div>
          
          {/* 6个图文对 - 左右交替 */}
          <div className="project-detail-sections">
            {detailProject.sections.map((section, i) => (
              <div className={`project-section ${i % 2 === 0 ? 'section-left' : 'section-right'}`} key={i}>
                <div className="project-section-text">
                  <span className="section-number">0{i + 1}</span>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
                <div className="project-section-image">
                  {section.image ? (
                    <img src={section.image} alt={section.title} />
                  ) : (
                    <div className="project-image-placeholder">
                      <span>图片 0{i + 1}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </main>
}

function Nav({ open, onToggle, onClose }) { return <header className="nav"><div className="nav-inner shell"><a className="logo" href="#top" onClick={onClose}>YLS<span>.</span></a><button className="menu-btn" onClick={onToggle} aria-label="打开导航">{open ? <X/> : <Menu/>}</button><nav className={open ? 'open' : ''}><a href="#works" onClick={onClose}>作品</a><a href="#projects" onClick={onClose}>项目</a><a href="#about" onClick={onClose}>关于我</a><a href="#strengths" onClick={onClose}>能力</a><a className="resume-link" href="/ye-langsen-resume.pdf" download="叶浪森_简历.pdf" onClick={onClose}>简历 PDF</a><a className="contact-btn" href="#contact" onClick={onClose}>联系我 <ArrowUpRight size={16}/></a></nav></div></header> }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
