import React from 'react';
import { Button } from 'react-bootstrap';
import './ContractUs.css';
import contactImg from '../../Images/contractUs.svg';

const ContractUs = () => {
    return (
        <div className="container contact-container mt-5">
            <div className='contract-form'>
                <h1 className='text-center'>CONTACT US</h1>
                <div className="row mt-5">
                    <div className="col-12 col-md-6 contract-img">
                        <img src={contactImg} alt="" />
                    </div>


                    <div className="col-12 col-md-6 from-div">
                        <div className='input-section'>
                            <input type="text" name="" id="" placeholder='Enter Your Name' />
                            <input type="email" name="" id="" placeholder='Enter Your Email' />
                            <textarea name="" id="" cols="10" rows="3" placeholder='Enter Your Message'></textarea>
                        </div>

                        <Button className='mt-5 button' variant="primary">Send</Button>

                    </div>
                </div>






            </div>
        </div>
    );
};

export default ContractUs;