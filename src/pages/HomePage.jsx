import { useState } from 'react';
import { Button, Card } from '@mui/material';
import Icon from '@mui/icons-material/Calculate';
import { kits } from '../services/KitisData';
import '../assets/styles/stylesHome.css';
import KitModal from '../components/KitModal';
import { useNavigate } from 'react-router-dom';
import kitIMG from "../assets/kit.png";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const navigate = useNavigate();

  const showModal = (kit) => {
    setSelectedKit(kit);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedKit(null);
  };

  return (
    <div className="background">
      <div className="container">
        <div className="headerContainer">
          <h1 className="title">Catálogo de Kits Solares</h1>
        </div>
        <div className="cardContainer">
          {kits.map((kit, index) => (
            <Card key={index} className="card" onClick={() => showModal(kit)}>
              <div className="cardContent">
                <img src={kitIMG} alt="Kit" className="cardImage" />
                <div className="cardTextContainer">
                  <h2 className="cardTitle">{kit.name}</h2>
                  <p className="price">{kit.price}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="btnModal">
          <Button
            variant="contained"
            startIcon={<Icon />}
            onClick={() => navigate('/comodato')}
            className="button" // Adiciona classe para largura total
          >
            <span>Comodato</span>
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon />}
            onClick={() => navigate('/compensacao')}
            className="Buttons" // Adiciona classe para largura total
          >
            <span>Compensação</span>
          </Button>
        </div>

        <KitModal
          visible={visible}
          hideModal={hideModal}
          selectedKit={selectedKit}
        />
      </div>
    </div>
  );
}

export default HomePage;
