import TestimonialSlider2 from "../slider/TestimonialSlider2"


export default function Testimonials2() {
    return (
        <>
            <section className="testimonials s2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="testimonials__main">
                                <div className="block-text center">
                                    <h6 className="sub-heading"><span>Testimonials</span></h6>
                                    <h3 className="heading">What People Say <br />
                                        about us
                                    </h3>
                                </div>

                                <TestimonialSlider2 />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
