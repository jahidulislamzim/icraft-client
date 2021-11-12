import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import './ManageAllOrde.css';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import doneImage from '../../../Images/donegif.gif'

const ManageAllOrder = () => {

    let { url } = useRouteMatch();







    const [services, setServices] = useState([]);
    const [spinner, setSpinner] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [show, setShow] = useState(false);
    const [statusModalShow, setStatusModalShow] = useState(false);
    const [orderId, setOrdersId] = useState('');
    const [statusId, setStatusId] = useState('');
    const [status, setStatus] = useState();





    const handleClose = () => setShow(false);
    const handleShow = (_uid) => {
        setShow(true);
        setOrdersId(_uid);
    };

    const handleStatusModal = (sid) => {
        setStatusModalShow(true)
        setStatusId(sid);
    }


    const handlePending = () => {
        setStatus('Pending')
    }

    const handleShipping = () => {
        setStatus('Shipped')
    }

    const handleDelivery = () => {
        setStatus('Delivered')
    }





    const getData = () => {
        axios
            .get('http://localhost:5000/Orders')
            .then(res => {
                setServices(res.data)
                setSpinner(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }






    useEffect(() => {
        getData()
    }, [])


    //Delete Data
    const handleDeleteOrder = () => {
        const url = `http://localhost:5000/Orders/${orderId}`;
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





    const handleUpdateStatus = () => {

        const url = `http://localhost:5000/Orders/${statusId}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setStatus('');
                    getData()
                }
            })
    }









    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'>
                        Deleted Successfully
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-auto text-center'>
                    <img src={doneImage} className='w-50' alt="" srcset="" />
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                    <Button onClick={props.onHide}>Done</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function MyVerticallyCenteredModalStatus(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'>
                        Update Status Successfully
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-auto text-center'>
                    <img src={doneImage} className='w-50' alt="" srcset="" />
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                    <Button onClick={() => { props.onHide(); handleUpdateStatus(); }}>Done</Button>
                </Modal.Footer>
            </Modal>
        );
    }














    return (
        <main style={{ width: '80%' }}>

            <div className=" p-5">
                <h1 className='text-center mb-3'>Manage Service</h1>
                <from>

                    {
                        spinner ?



                            <table className="table table-custom">
                                <thead>
                                    <tr className='table-header'>

                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Change Status</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody style={{ verticalAlign: 'middle' }}>

                                    {
                                        services.map(service =>
                                            <tr key={service._id} className="text-secondary table-data">
                                                <td><img style={{ width: '100px', height: '50px', borderRadius: '10px' }} src={service.img} alt="" /></td>
                                                <td>{service.name}</td>
                                                <td>${service.price}</td>
                                                <td>{service.status}</td>


                                                <td className='select-option' >
                                                    <div className="dropdown">
                                                        <h6>Change Status</h6>
                                                        <div className="dropdown-content">
                                                            <Button onClick={(e) => { handlePending(e); handleStatusModal(service._id); }}>Pending</Button>
                                                            <Button onClick={(e) => { handleShipping(e); handleStatusModal(service._id); }}>Shipped</Button>
                                                            <Button onClick={(e) => { handleDelivery(e); handleStatusModal(service._id); }}>Delivered</Button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><button onClick={() => { handleShow(service._id) }} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} />  Delete</button></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            :
                            <div className="d-flex justify-content-center align-items-center m-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>



                    }








                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Do You really want to delete these records?This process cannot be undone.</Modal.Body>
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

                    <>
                        <MyVerticallyCenteredModalStatus
                            show={statusModalShow}
                            onHide={() => { setStatusModalShow(false) }}
                        />
                    </>



                </ from >
            </div>

        </main >
    );
};

export default ManageAllOrder;