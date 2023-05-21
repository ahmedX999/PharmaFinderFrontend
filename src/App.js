
import './App.css';
import Footer from './Footer';
import Header from './Header';


import AddPharmacy from './AddPharmacie';

import PharmacyFinder from './PharmacyFinder';


function App() {
  return (


    <div>
      <Header />
      <main>
        {<PharmacyFinder/>}
        {<AddPharmacy></AddPharmacy>}
      </main>
      <Footer />
    </div>
       
        
      
    



  
  
  );
}

export default App;
