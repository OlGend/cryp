import Link from "next/link"


export default function About1() {
    return (
        <>
            <section className="about">
                <div className="shape" />
                <div className="container">
                    <div className="row rev">
                        <div className="col-xl-6 col-md-12">
                            <div className="about__right">
                                <div className="images">
                                    <img className="img1" src="/assets/images/layouts/about-01.png" alt="" />
                                    <img className="img2" src="/assets/images/layouts/about-02.png" alt="" />
                                    <img className="img3" src="/assets/images/layouts/about-03.png" alt="" />
                                    <img className="img4" src="/assets/images/layouts/about-04.png" alt="" />
                                    <img className="img5" src="/assets/images/layouts/about-05.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="block-text">
                                <h6 className="sub-heading"><span>About us</span></h6>
                                <h3 className="heading wow" data-splitting>Hight Quality
                                    NFT Collections</h3>
                                <p className="mb-17">Cyfonii is the premier marketplace for nifties, which are digital items you can truly own for yourself</p>
                                <p className="mb-26">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occae cat cupidatat non proident, sunt in culpa qui officia dese runt mollit anim id est laborum velit esse cillum dolore eu fugiat nulla pariatu epteur sint occaecat</p>
                                <Link href="/about" className="action-btn"><span>More About Us</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
