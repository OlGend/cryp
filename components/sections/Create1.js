import Link from "next/link"


export default function Create1() {
    return (
        <>
            <section className="create">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="create__main">
                                <div className="content">
                                    <h4 className="heading">Create your NFT portfolio</h4>
                                    <p>Get udpated with news, tips &amp; tricks</p>
                                    <Link href="/contact" className="action-btn"><span>Join Now</span></Link>
                                </div>
                                <img src="/assets/images/layouts/create.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
