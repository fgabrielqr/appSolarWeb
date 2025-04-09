/* eslint-disable react/prop-types */
import { Modal, Button, Box, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import '../assets/styles/stylesHome.css';
import { useNavigate } from 'react-router-dom';
import kitIMG from "../assets/kit.png";

const KitModal = ({ visible, hideModal, selectedKit }) => {
    const navigate = useNavigate();
    const [watts, setWatts] = useState(() => {
        const savedWatts = localStorage.getItem('selectedWatts');
        return savedWatts ? parseInt(savedWatts) : 620;
    });

    const handleWattsChange = (event) => {
        const value = event.target.value;
        
        if (value === '') {
            setWatts('');
        } else {
            const newWatts = parseInt(value);
            if (newWatts > 0) {
                setWatts(newWatts);
                localStorage.setItem('selectedWatts', newWatts.toString());
            }
        }
    };

    return (
        <Modal
            open={visible}
            onClose={hideModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modalContainer">
                {selectedKit && (
                    <div className="modalContent">
                        <img
                            src={kitIMG}
                            alt="Kit"
                            className="modalImage"
                        />
                        <div className="modalTextContainer">
                            <Typography variant="h6" className="modalTitle" id="modal-title">
                                Sistema Fotovoltaico {selectedKit.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
                                <TextField
                                    type="number"
                                    label="Potência (Watts)"
                                    value={watts}
                                    onChange={handleWattsChange}
                                    size="small"
                                    sx={{ width: '150px' }}
                                    InputProps={{
                                        inputProps: { min: 1 }
                                    }}
                                />
                            </Box>
                            <Typography className="modalText" id="modal-description">
                                {selectedKit.panels}: Painéis Pulling Energy {watts || 0} Watts
                            </Typography>
                            <Typography className="modalText">
                                {selectedKit.inverters}: {selectedKit.mark}
                            </Typography>
                            <Typography className="modalText">
                                Valor do Kit: {selectedKit.price}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/comodato')}
                                className="modalButton"
                            >
                                Calcular Kit
                            </Button>
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
};

export default KitModal;
