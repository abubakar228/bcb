(() => {
  const init = () => {
    const header = document.querySelector('[data-bcb-header]');
    if (!header) return;

    const brandMenu = header.querySelector('.bcb-nav-dropdown');
    const mobileMenu = header.querySelector('.bcb-mobile-menu');

    if (brandMenu && window.matchMedia('(min-width: 990px)').matches) {
      let closeTimer;
      const openMenu = () => {
        window.clearTimeout(closeTimer);
        brandMenu.open = true;
      };
      const closeMenu = () => {
        closeTimer = window.setTimeout(() => { brandMenu.open = false; }, 90);
      };
      brandMenu.addEventListener('mouseenter', openMenu);
      brandMenu.addEventListener('mouseleave', closeMenu);
      brandMenu.querySelector('summary')?.addEventListener('focus', openMenu);
      brandMenu.addEventListener('focusout', (event) => {
        if (!brandMenu.contains(event.relatedTarget)) brandMenu.open = false;
      });
    }

    const closeAll = (event) => {
      if (event?.key && event.key !== 'Escape') return;
      if (brandMenu) brandMenu.open = false;
      if (mobileMenu) mobileMenu.open = false;
      document.documentElement.classList.remove('bcb-menu-open');
    };

    document.addEventListener('keydown', closeAll);
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) closeAll();
    });

    if (mobileMenu) {
      mobileMenu.addEventListener('toggle', () => {
        document.documentElement.classList.toggle('bcb-menu-open', mobileMenu.open);
      });
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.open = false;
          document.documentElement.classList.remove('bcb-menu-open');
        });
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 990 && mobileMenu?.open) {
        mobileMenu.open = false;
        document.documentElement.classList.remove('bcb-menu-open');
      }
    }, { passive: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
