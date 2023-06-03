import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import "../../styles/editZone-modal.css";
import Map from "../Map/Map";
import {Form, Alert} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcaseMedical, faHistory} from "@fortawesome/free-solid-svg-icons";
import {Icon} from "leaflet/src/layer/marker";
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";


export default function OndutyAvailable() {
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
    const isNightTime = now.getHours() >= 23 || now.getHours() < 9;
    const isNow = location.pathname.includes("now");

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);

        }

    }, []);

    useEffect(() => {
        console.log(pharmacies);
    }, [pharmacies]);

    useEffect(() => {
            const fetchPharmacies = async () => {
                let result;
                // console.log(location.pathname);
                if (location.pathname.includes("now") && isNightTime) {
                    result = await axios.get("http://localhost:8080/api/v1/pharmaciesgarde/allDispoPharmacies/garde/2", {headers: authHeader()})
                } else if (location.pathname.includes("now") && !isNightTime) {
                    result = await axios.get("http://localhost:8080/api/v1/pharmaciesgarde/allDispoPharmacies/garde/1", {headers: authHeader()})
                } else {
                    result = await axios.get("http://localhost:8080/api/v1/pharmaciesgarde/allDispoPharmacies", {headers: authHeader()})

                }
                setPharmacies(result.data);
            }
            fetchPharmacies();

            const fetchZones = async () => {
                const result = await axios.get("http://localhost:8080/api/v1/zones", {headers: authHeader()})
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
    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/4287/4287703.png",
        iconSize: [38, 38],
    });

    const filteredPharmacies = isNight ? pharmacies.filter((pharmacy) => pharmacy.garde.type === "nuit") : pharmacies;

    return (<>
        {currentUser?.role !== 'USER' &&
            <Alert key='primary' variant='primary'>
                If want to see the history of On-duty Pharmacies : {' '}
                <Alert.Link as={Link} to="/ondutypharmacies/history"> click here<FontAwesomeIcon icon={faHistory}/></Alert.Link>
            </Alert>
        }
        {!isNow && (<Alert key='success' variant='success'>
            Find Open Pharmacies Now - See Who's On Duty Right Now !!{' '}
            <Alert.Link  as={Link} to="/ondutypharmacies/available/now"> click here<FontAwesomeIcon
                icon={faBriefcaseMedical}/></Alert.Link>
        </Alert>)}

        <div><h2>On-duty Pharmacies: </h2>
            {isNow ? (<h3>
                {isNightTime ? (<span>Night </span>) : (<span>Day </span>)}
                Shift
            </h3>) : (<span></span>)}
        </div>
        <div className="pharmacies-container">
            {!isNow && (
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isNight} onChange={toggleIsNight}
                        label="Pharmacies open at night"
                    />
                </Form>
            )}

            {filteredPharmacies.length > 0 ? (<table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Location</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Day/Night</th>
                </tr>
                </thead>
                <tbody>
                {filteredPharmacies.map((pharmacy) => (<tr key={pharmacy.pharmacy.id}>
                    <td>{pharmacy.pharmacy.id}</td>
                    <td>{pharmacy.pharmacy.name}</td>
                    <td>{pharmacy.pharmacy.address}</td>
                    <td>
                        {pharmacy.altitude !== 0 && pharmacy.longitude !== 0 && (
                            <img width={customIcon.options.iconSize[0]} height={customIcon.options.iconSize[1]}
                                 src={customIcon.options.iconUrl} alt="Location Icon"
                                 onClick={() => showMap(pharmacy.pharmacy.altitude, pharmacy.pharmacy.longitude, pharmacy.pharmacy)}

                            />

                        )}
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