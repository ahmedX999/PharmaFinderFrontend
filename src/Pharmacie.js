import React, { useState, useEffect } from "react";

function PharmacyList() {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    async function fetchPharmacies() {
      const response = await fetch("http://localhost:8080/api/pharmacies");
      const data = await response.json();
      setPharmacies(data);
    }
    fetchPharmacies();
  }, []);

  return (
    <div>
      {pharmacies.map((pharmacy) => (
        <div key={pharmacy.id}>
          <h3>{pharmacy.name}</h3>
          <img src={pharmacy.photo} alt={pharmacy.name} />
        </div>
      ))}
    </div>
  );
}

export default PharmacyList;
