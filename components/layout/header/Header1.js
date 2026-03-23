import MobileMenu from "../MobileMenu"
import { useTranslation } from 'react-i18next'

function scrollToSection(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
        const headerHeight = document.getElementById('header_main')?.offsetHeight || 80;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, big }) {
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
            <header id="header_main" className={`header ${scroll ? "is-fixed is-small" : ""}`}>
                <div className={`container ${big ? "big" : ""}`}>
                    <div className="row">
                        <div className="col-12">
                            <div className="header__body">
                                <div className="header__logo">
                                    <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
                                        <img id="site-logo" src="/assets/images/logo/logo.png" alt="Logo" width={160} height={38} />
                                    </a>
                                </div>
                                <div className="header__right">
                                    <nav id="main-nav" className="main-nav">
                                        <ul id="menu-primary-menu" className="menu">
                                            {menuItems.map((item, i) => (
                                                <li key={i} className="menu-item">
                                                    <a href={`#${item.target}`} onClick={(e) => scrollToSection(e, item.target)}>
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    <div className="mobile-button" onClick={handleMobileMenu}><span /></div>
                                </div>
                                <div className="header__action">
                                    <a href="#block4" onClick={(e) => scrollToSection(e, 'block4')} className="action-btn">
                                        <span>{t('Play Now')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            </header>
        </>
    )
}
