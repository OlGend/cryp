import { useTranslation } from 'react-i18next'

function scrollToSection(e, id, closeMobileMenu) {
    e.preventDefault();
    if (closeMobileMenu) closeMobileMenu();
    const el = document.getElementById(id);
    if (el) {
        const headerHeight = document.getElementById('header_main')?.offsetHeight || 80;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }) {
    const { t } = useTranslation();

    const menuItems = [
        { label: t('Home'), target: 'hero' },
        { label: t('Featured'), target: 'block6' },
        { label: t('Crypto Bonuses'), target: 'block2' },
        { label: t("Editor's Choice"), target: 'block3' },
        { label: t('Top Casinos'), target: 'block4' },
        { label: t('Winners'), target: 'block5' },
    ];

    return (
        <>
            <nav id="main-nav-mobi" className="main-nav" style={{ display: `${isMobileMenu ? "block" : "none"}` }}>
                <ul id="menu-primary-menu" className="menu">
                    {menuItems.map((item, i) => (
                        <li key={i} className="menu-item">
                            <a href={`#${item.target}`} onClick={(e) => scrollToSection(e, item.target, handleMobileMenu)}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
