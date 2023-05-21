import React from 'react'
import FooterComponent from './FooterComponent';
function Apropos() {
    return (
      <div style={{ width: "100%" }}>
        <div className="container">
          <h1 className="mt-4 mb-4 text-center">À Propos</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bienvenue sur notre application de localisation des pharmacies au Maroc !</h5>
              <p className="card-text">
                Notre application vous permet de trouver facilement les pharmacies les plus proches de chez vous, que vous soyez dans une grande ville ou une zone rurale.
              </p>
              <p className="card-text">
                Vous pouvez rechercher les pharmacies par ville et zone, ce qui facilite la recherche de pharmacies dans des régions spécifiques du Maroc.
              </p>
              <p className="card-text">
                Nous mettons constamment à jour notre base de données pour garantir que les informations sur les pharmacies sont précises et à jour.
              </p>
              <p className="card-text">
                N'hésitez pas à explorer notre application et à utiliser les fonctionnalités de recherche pour trouver la pharmacie la plus proche de chez vous en cas de besoin.
              </p>
              <p className="card-text">
                Merci d'utiliser notre application et nous espérons qu'elle vous sera utile !
              </p>
            </div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
        <FooterComponent />
      </div>

    </div>
      );
    };
export default Apropos;