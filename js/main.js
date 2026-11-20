(function () {
  const root = document.documentElement;

  // 다크 모드 토글
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // 모바일 메뉴
  const menuBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );

  // 스크롤 reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // 현재 섹션 네비게이션 표시
  const links = document.querySelectorAll('nav .nav-link');
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href')));
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => s && navObserver.observe(s));

  // 이메일 복사 + 토스트
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }
  document.getElementById('copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('woonghwan@gmail.com');
      showToast('이메일 주소가 복사되었습니다');
    } catch {
      showToast('복사에 실패했습니다. 직접 복사해 주세요');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
