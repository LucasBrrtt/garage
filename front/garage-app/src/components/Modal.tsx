import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

interface ModalProps {
    isOpen?: any;
    setModalOpen?: any;
    children?: any;
    save?: any;
}

export default function ModalComponet({ isOpen, setModalOpen, children, save }: ModalProps) {

    const [show, setShow] = useState(isOpen);
    
    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    function saveAndClose(){
        save();
        setShow(setModalOpen);
    }

    if (isOpen) {
        return (
            <Modal show={ show } onHide={ () => { return setShow(setModalOpen) } }>

                <Modal.Header closeButton>
                    <Modal.Title>Filtro</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    { children }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => { return setShow(setModalOpen) } }>
                        Fechar
                    </Button>
                    <Button onClick={ saveAndClose } variant="primary">
                        Filtrar
                    </Button>
                </Modal.Footer>

            </Modal>
        )
    }

    return null

}
