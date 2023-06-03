import {MapContainer, Marker, Popup, TileLayer,Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../App.css";
import {Icon} from "leaflet/src/layer/marker";
import MarkerClusterGroup from "react-leaflet-cluster";
import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {Container, Form} from "react-bootstrap";
import {faMapLocation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import authHeader from "../../Services/auth-header";


const MapComponent = () => {
    const position = [31.611530277838078, -8.047648552164675];
    const [currentLocation, setCurrentLocation] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [pharmacies, setPharmacies] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const [polylineCoords, setPolylineCoords] = useState(null); // Added state for polyline coordinates

    const fetchPharmacies = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/pharmacies", {headers: authHeader()})
            setPharmacies(response.data);
            const markers = response.data.map((pharmacy) => ({
                geocode: [pharmacy.altitude, pharmacy.longitude],
                pharmacy: pharmacy,
            }));
            setMarkers(markers);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const options = {
            enableHighAccuracy: true, // Use GPS and other high-accuracy methods
            timeout: 5000, // Wait up to 5 seconds for a location
            maximumAge: 0, // Force the browser to get a fresh location (no caching)
        };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setCurrentLocation([latitude, longitude]);
            },
            (error) => {
                console.error(error);
            },options
        );
    }, []);

    useEffect(() => {
        fetchPharmacies();
    }, [fetchPharmacies]);

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/4287/4287703.png",
        iconSize: [38, 38],
    });

    const userIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3382/3382279.png",
        iconSize: [50, 50],
    });

    const handleMarkerClick = useCallback((pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setPopupVisible(true);
    }, []);

    const openGoogleMapsDirections = (destination) => {
        const destinationCoords = `${destination.altitude},${destination.longitude}`;
        let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords}`;

        if (currentLocation) {
            const originCoords = currentLocation.join(",");
            googleMapsUrl += `&origin=${originCoords}`;
        }
        setPolylineCoords([currentLocation, [destination.altitude, destination.longitude]]);
        window.open(googleMapsUrl, "_blank");
    };

    const MyPopup = ({pharmacy, visible, onClose}) => {
        return (<>
            {pharmacy && visible && (<Popup onClose={onClose}>
                <Form>
                    <Form.Label style={{fontWeight: "bold"}}>Name:</Form.Label>
                    {pharmacy.name}
                    <br/>
                    <Form.Label style={{fontWeight: "bold"}}>Address:</Form.Label>
                    {pharmacy.address}
                    <br/>
                    <Form.Label style={{fontWeight: "bold"}}>Phone Number:</Form.Label>
                    {pharmacy.phone}
                    <br/>
                    <Form.Label style={{fontWeight: "bold"}}>State:</Form.Label>
                    {pharmacy.state === 0 && <span>Waiting</span>}
                    {pharmacy.state === 1 && <span>Accepted</span>}
                    {pharmacy.state === 2 && <span>Refused</span>}
                    <br/>
                    <Form.Label style={{fontWeight: "bold"}}>Zone:</Form.Label>
                    {pharmacy.zone.name}
                    <br/>
                    <Form.Label style={{fontWeight: "bold"}}>Location:</Form.Label>
                    [{pharmacy.altitude.toFixed(3)}, {pharmacy.longitude.toFixed(3)}]
                    <br/>
                    <FontAwesomeIcon
                        icon={faMapLocation}
                        className="text-danger cursor"
                        onClick={() => openGoogleMapsDirections(pharmacy)}
                    />

                </Form>
            </Popup>)}
        </>);
    };


    return (
        <>
            <Container style={{backgroundColor: "#001e28"}}>
                <div className="home-container">
                    <h1>Welcome to Pharma Finder</h1>
                    <p>Find pharmacies near you, anytime.</p>
                    <MapContainer
                        style={{height: "600px", width: "1300px"}}
                        center={position}
                        zoom={13}
                        scrollWheelZoom={true}

                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup>
                            {markers.map((marker) => (<Marker
                                key={marker.pharmacy.id}
                                icon={customIcon}
                                position={marker.geocode}
                                eventHandlers={{
                                    click: () => handleMarkerClick(marker.pharmacy),
                                }}
                            >
                                {selectedPharmacy && (<MyPopup
                                    pharmacy={selectedPharmacy}
                                    visible={popupVisible}
                                    onClose={() => setPopupVisible(false)}
                                />)}
                            </Marker>))}
                        </MarkerClusterGroup>
                        {currentLocation && (<Marker icon={userIcon} position={currentLocation}>
                            <Popup>
                                <h6> You are here </h6>
                            </Popup>
                        </Marker>)}
                        {polylineCoords && <Polyline positions={polylineCoords} color="red" />} {/* Display the polyline */}
                    </MapContainer>
                </div>
            </Container>
        </>
    )
        ;

}
export default MapComponent;