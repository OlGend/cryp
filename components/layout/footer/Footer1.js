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

export default function Footer1() {
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
            <footer className="footer">
                <div className="shape" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="footer__main">
                                <div className="block-text center">
                                    <h3 className="heading">{t('Get Newsletter')}</h3>
                                    <p>{t('Get updated with news, tips & tricks')}</p>
                                </div>
                                <form action="#" className="form">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder={t('Your email')} />
                                    </div>
                                    <button className="action-btn"><span>{t('Subscribe')}</span></button>
                                </form>
                            </div>
                            <div className="footer__bottom">
                                <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="logo">
                                    <img src="/assets/images/logo/logo.png" alt="" />
                                </a>
                                <div className="center mb--30">
                                    <ul className="list">
                                        {menuItems.map((item, i) => (
                                            <li key={i}>
                                                <a href={`#${item.target}`} onClick={(e) => scrollToSection(e, item.target)}>
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Copyright © {new Date().getFullYear()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
