import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ManageService.css';
import { Button, Modal } from 'react-bootstrap';
import doneImage from '../../../Images/donegif.gif';

const ManageService = () => {




    const [services, setServices] = useState([]);
    const [spinner, setSpinner] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [show, setShow] = useState(false);
    const [orderId, setOrdersId] = useState('');





    const handleClose = () => setShow(false);
    const handleShow = (_uid) => {
        setShow(true);
        setOrdersId(_uid);
    };










    useEffect(() => {
        fetch('https://calm-dusk-84501.herokuapp.com/AllHandiCraft')
            .then(res => res.json())
            .then(data => {
                setServices(data)
                setSpinner(data)
            })
    }, [])





    //Delete Data
    const handleDeleteOrder = () => {
        const url = `https://calm-dusk-84501.herokuapp.com/AllHandiCraft/${orderId}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setModalShow(true)
                }

            })
        handleClose();

    }


    const handleUpdateData = () => {
        const remainingOrder = services.filter(order => order._id !== orderId);
        setServices(remainingOrder);

    }



    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deleted Successfully
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-auto text-center'>
                    <img src={doneImage} className='w-50' alt="" srcset="" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Done</Button>
                </Modal.Footer>
            </Modal>
        );
    }












    return (
        <main className="mb-5 mt-5">

            <div>
                <h1 className='text-center mb-3'>Manage Products</h1>


                {
                    spinner ?

                        <div>
                            <div className='dextop-view'>
                                <table className="table table-custom">
                                    <thead>
                                        <tr className='table-header'>

                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ verticalAlign: 'middle' }}>

                                        {
                                            services.map(service =>
                                                <tr key={service._id} className="text-secondary table-data">
                                                    <th><img style={{ width: '100px', height: '50px', borderRadius: '10px' }} src={service.image} alt="" /></th>
                                                    <th>{service.name}</th>
                                                    <th>${service.price}</th>
                                                    <td><button onClick={() => { handleShow(service._id) }} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} />  Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <div className='mobile-view px-2'>
                                    <div class="card-deck">
                                        {
                                            services.map(service =>

                                                <div class="card text-center mt-5">
                                                    <img class="card-img-top w-75 mx-auto" src={service.image} alt="" />
                                                    <div class="card-body">
                                                        <h5 class="card-title">{service.name}</h5>
                                                        <p class="card-text">Price: ${service.price}</p>
                                                        <div className='text-center'>
                                                            <button onClick={() => { handleShow(service._id) }} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} />  Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-center align-items-center m-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>


                }










                <Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do You really want to delete these records? This process cannot be undone. </Modal.Body>
                    <Modal.Footer>


                        <Button variant="secondary" onClick={() => handleClose()} >
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => { handleDeleteOrder(); }} >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>



                <>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => { setModalShow(false); handleUpdateData() }}
                    />
                </>




            </div>

        </main >
    );
};

export default ManageService;