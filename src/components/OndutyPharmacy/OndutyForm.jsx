import {Button, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import axios from "axios";
import AuthService from "../../Services/auth.service";
import Notiflix from "notiflix";


export default function OndutyForm() {
    const [gardeId, setGardeId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = AuthService.getCurrentUser().email;
        const response = await axios.get(`http://localhost:8080/api/v1/pharmacies/user/${email}`);
        const pharmacy = response.data;
        const pharmacyId = pharmacy?.id;
        const parsedGardeId = parseInt(gardeId);
        axios.put(`http://localhost:8080/api/v1/pharmaciesgarde/add/${pharmacyId}?gardeId=${parsedGardeId}&startDate=${startDate}&endDate=${endDate}`)
            .then(response => {
                Notiflix.Notify.success("Garde added successfully");
                console.log(response.data);
            })
            .catch(error => {

                if(error.response.data.Approbation){
                    Notiflix.Report.failure(
                        'Access Control',
                        error.response.data.Approbation,
                        'Okay',
                    );
                }
                setErrors(error.response.data);
            });
    };


    return (
        <Container className="col-xl-5 col-lg-5 col-md-5 col-xl-9 col-10 mt-5 p-4 border rounded shadow">
            <h2>On-Duty Pharmacy Schedule</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="gardeId">
                    <Form.Label>Select Garde</Form.Label>
                    <Form.Control as="select" value={gardeId} onChange={(event) => setGardeId(event.target.value)}>
                        <option value="">Select Garde</option>
                        <option value="1">Day</option>
                        <option value="2">Night</option>
                    </Form.Control>
                    {errors.garde && <Form.Text className="text-danger">{errors.garde}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)}/>
                    {errors.startDate && <Form.Text className="text-danger">{errors.startDate}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>
                    {errors.endDate && <Form.Text className="text-danger">{errors.endDate}</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>

    )
}