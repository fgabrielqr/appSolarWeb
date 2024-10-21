/* eslint-disable react/prop-types */
import { Modal, Button, Box, Typography } from '@mui/material';
import '../assets/styles/stylesHome.css';
import { useNavigate } from 'react-router-dom';
import kitIMG from "../assets/kit.png";

const KitModal = ({ visible, hideModal, selectedKit }) => {
    const navigate = useNavigate();

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
                            <Typography className="modalText" id="modal-description">
                                {selectedKit.panels}: Painéis Sunova 585W
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
