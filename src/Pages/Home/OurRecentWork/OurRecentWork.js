import React from 'react';
import './OurRecentWork.css';
import demo from '../../Images/HeaderImage.png';

const OurRecentWork = () => {
    return (
        <section className="container mt-5 recent-container">
            <div className='text-center text-light pt-5'>
                <h1>Success Story</h1>
            </div>
            <div className="row">
                <div className="col-md-6 p-3">
                    <div>
                        <div>
                            <img className="img-fluid p-3" src={demo} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-3 d-flex justify-content-center text-light align-items-center">

                    <div className="recentWorkDescription p-3">
                        <h2>Our Team <br />Win IHGF Delhi Fair Autumn 2021  </h2>
                        <p>
                            HGF is amongst Asia's largest gifts & handicrafts fair, held biannually (Spring & Autumn edition) and is organised by Export Promotion Council for Handicrafts (EPCH).
                            EPCH, India's premier export promotion organisation with 10000 member exporters is engaged in trade promotion of handicrafts exports from India. IHGF Fair Spring 2022 has been the hallmark for growth of the Indian handicrafts sector for over 28 years. IHGF Delhi Fair is a favourite sourcing connect for the best in home, fasthion, textiles & furniture from India leading manufactures.
                        </p>
                        <button className="anchorBtn">Learn more...</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurRecentWork;