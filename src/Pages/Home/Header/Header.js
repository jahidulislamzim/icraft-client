import React from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../../Images/HeaderImage.png';
import './Header.css';

const Header = () => {
    return (
        <main className="container">
            <div className="row p-3">
                <div className="col-md-6 text-light d-flex justify-content-center align-items-center">
                    <div>
                        <h1 className="fw-bolder"> Introducing
                            iCraft </h1>
                        <h1>Handmade Wooden HandiCraft</h1>
                        <p className="m-0  mt-1">Our handicrafts range supplies the best in wooden handmade items from around India to our customers. Online shoppers will feel delighted with the neat ...</p>
                        <Link to="/services"><button className="brandBtn mt-5 me-3">START SHOPPING</button></Link>
                    </div>

                </div>
                <div className="col-md-6  d-flex justify-content-center align-items-center p-3  headerImageDiv">
                    <div>
                        <img className="img-fluid" src={headerImage} alt="" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Header;