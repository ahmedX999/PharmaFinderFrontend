import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import "../../styles/editZone-modal.css";
import Map from "../Map/Map";
import {Form, Alert} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHistory} from "@fortawesome/free-solid-svg-icons";


export default function OndutyAvailablee() {
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [zones, setZones] = useState([]);
    const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
    const [alt, setAlt] = useState('');
    const [long, setLong] = useState('');
    const [isNight, setIsNight] = useState(false);
    const location = useLocation();

    const now = new Date();
    //console.log(now);
    const isNightTime = false;

    useEffect(() => {
            const fetchPharmacies = async () => {
                let result;
                // console.log(location.pathname);
                if (location.pathname.includes("available") && isNightTime) {
                    result = await axios.get("/api/pharmacies/garde/allDispoPharmacies/garde/2");
                } else if (location.pathname.includes("available") && !isNightTime) {
                    result = await axios.get("/api/pharmacies/garde/allDispoPharmacies/garde/1");
                }

                setPharmacies(result.data);
                console.log(pharmacies);
            }
            fetchPharmacies();

            const fetchZones = async () => {
                const result = await axios.get("/api/zones");
                setZones(result.data);
            }
            fetchZones();

        }, // eslint-disable-next-line
        []);

    const showMap = (lal, long, pharmacy) => {
        setMapModalIsOpen(true);
        if (lal && long) {
            setAlt(lal);
            setLong(long);
            setSelectedPharmacy(pharmacy);
        }
    };
    const toggleIsNight = () => {
        setIsNight(!isNight);
    };


    const filteredPharmacies = isNight ? pharmacies.filter((pharmacy) => pharmacy.garde.type === "nuit") : pharmacies;

    return (<>

        <Alert key='info' variant='info'>
            If want to see the history of On-duty Pharmacies : {' '}
            <Alert.Link href="/ondutypharmacies/history"> click here<FontAwesomeIcon icon={faHistory}/></Alert.Link>
        </Alert>

        <div className="pharmacies-container">
            {isNightTime ? (<h2>On-duty Pharmacies : Night shift </h2>) : (<h2>On-duty Pharmacies : Day shift </h2>)}
            {!isNightTime &&<Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={isNight} onChange={toggleIsNight}
                    label="Pharmacies open at night"
                />
            </Form>}
            {filteredPharmacies.length > 0 ? (<table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Location</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
                </thead>
                <tbody>
                {filteredPharmacies.map((pharmacy) => (<tr key={pharmacy.pharmacy.id}>
                    <td>{pharmacy.pharmacy.id}</td>
                    <td>{pharmacy.pharmacy.name}</td>
                    <td>{pharmacy.pharmacy.address}</td>
                    <td>
                        {pharmacy.pharmacy.altitude !== 0 && pharmacy.pharmacy.longitude !== 0 && (<button
                            onClick={() => showMap(pharmacy.pharmacy.altitude, pharmacy.pharmacy.longitude, pharmacy.pharmacy)}>show
                            map
                        </button>)}
                    </td>
                    <td>
                        {new Date(pharmacy.startDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC'
                        })}
                    </td>
                    <td>
                        {new Date(pharmacy.endDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC'
                        })}
                    </td>
                    <td>{pharmacy.garde.type}</td>
                </tr>))}
                </tbody>
            </table>) : (<p>No On-duty pharmacies found.</p>)}
            <Modal show={mapModalIsOpen} onHide={() => {
                setMapModalIsOpen(false)
            }}
                   size='xl'
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pharmacy on Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Map center={[alt, long]} selectedPharmacy={selectedPharmacy}/>
                </Modal.Body>


            </Modal>

        </div>
    </>)

}