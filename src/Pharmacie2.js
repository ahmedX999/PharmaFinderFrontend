
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';


export default function Pharmacie2() {




  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pharmaciesPerPage = 3;

  useEffect(() => {
    fetch('http://localhost:8080/api/pharmacies')
      .then(response => response.json())
      .then(data => {
        setPharmacies(data);
      });
  }, []);

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPharmacy = currentPage * pharmaciesPerPage;
  const indexOfFirstPharmacy = indexOfLastPharmacy - pharmaciesPerPage;
  const currentPharmacy = filteredPharmacies.slice(indexOfFirstPharmacy, indexOfLastPharmacy);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

 

  return (
    <>
     
      
  
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Search Complexes"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "20px" }}>
        
            {currentPharmacy.map(pharmacy => (
             
             <Card key={pharmacy.id} sx={{ maxWidth: 345 }}>
             <CardMedia
               component="img"
               alt={pharmacy.name}
               height="300"
               image={pharmacy.photo}
             />
             <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                 {pharmacy.name}
               </Typography>
               <Typography  variant="body1" color="text.secondary">
                Pharmacie 
               </Typography>
               <hr />
               <br />
               <Typography variant="body2" color="text.secondary">
                Address : {pharmacy.address}
               </Typography>

             </CardContent>
             <CardActions>
             
               <Button size="big" style={{ backgroundColor: "#E0B0FF", color: "white" }}>
                  Consulter
               </Button>      
             </CardActions>
           </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
            <Pagination count={Math.ceil(filteredPharmacies.length / pharmaciesPerPage)} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </>
  )
}
