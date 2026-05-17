// ════════════════════════════════════════════
// 页脚年份：自动显示当前年份，无需手动更新
// ════════════════════════════════════════════
document.getElementById('year').textContent = new Date().getFullYear();


// ════════════════════════════════════════════
// 导航栏：滚动超过 20px 后加阴影
// ════════════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});


// ════════════════════════════════════════════
// 移动端汉堡菜单：点击展开/收起导航链接
// ════════════════════════════════════════════
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // 更新无障碍属性，屏幕阅读器可感知菜单状态
  toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// 点击任意导航链接后自动收起菜单
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ════════════════════════════════════════════
// 导航高亮：滚动时自动高亮对应章节的导航项
// 使用 IntersectionObserver，性能优于 scroll 事件
// ════════════════════════════════════════════
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 先清除所有高亮，再给当前区块的链接加高亮
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 }); // 区块进入视口 35% 时触发

sections.forEach(s => sectionObserver.observe(s));


// ════════════════════════════════════════════
// 滚动进入动画：元素进入视口时淡入上浮
// 先给目标元素加 .reveal（初始隐藏），
// 进入视口后加 .visible（触发 CSS 过渡）
// ════════════════════════════════════════════

// 需要动画的元素选择器
const animatedSelectors = [
  '.skill-card',
  '.timeline-item',
  '.project-card',
  '.award-card',
  '.about-grid',
  '.contact-intro',
].join(',');

document.querySelectorAll(animatedSelectors).forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // 动画播放一次后停止观察，节省性能
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 }); // 元素露出 8% 时即开始动画

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
