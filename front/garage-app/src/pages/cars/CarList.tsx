import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/car'

interface CarProps {
    id: string;
    name: string;
    brand: string;
    color: string;
    plate: string;
    year: string;
}

export default function CarList() {

    const [carList, setCarList] = useState<CarProps[]>([])
    const [carToDelete, setCarToCarDelete] = useState(Object)
    const [show, setShow] = useState(false);

    function handleShowDeleteModal(item: object) {
        setCarToCarDelete(item)
        setShow(true)
    }

    function handleCloseDeleteModal() {
        setShow(false)
    }
    
    const getCars = async () => {
        const response = await api.get('car');
        return response.data
    }

    function handleDelete() {
        console.log(carToDelete);
    }

    useEffect(() => {
        const getCarsValue = async () => {
            const value = await getCars();
            if (value) setCarList(value);
        };
        getCarsValue();
    }, []);

    return (
        <>
            <Title title={'Lista de Carros'}>
                <Link to={"/detalhe"}>
                    <Button variant='success'>
                        <FontAwesomeIcon icon={faPlus} /> {' '}
                        Adicoinar Carro

                    </Button>
                </Link>
            </Title>
            <Table striped bordered hover>
                <thead className='table-dark mt-3'>
                    <tr>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Cor</th>
                        <th>Placa</th>
                        <th>Ano</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {carList.map((x) => (
                        <tr key={x.id}>
                            <td>{x.name}</td>
                            <td>{x.brand}</td>
                            <td>{x.color}</td>
                            <td>{x.plate}</td>
                            <td>{x.year}</td>
                            <td>
                                <div>
                                    <Link to={`/detalhe/${x.id}`}>
                                        <button className='btn btn-sm btn-primary me-2'>
                                            <FontAwesomeIcon icon={faPen} /> {' '}
                                            Editar
                                        </button>
                                    </Link>
                                    <button className='btn btn-sm btn-danger me-2' onClick={() => handleShowDeleteModal(x)}>
                                        <FontAwesomeIcon icon={faTrash} /> {' '}
                                        Remover
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja remover o carro: {carToDelete.nome}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        <FontAwesomeIcon icon={faTimes} /> {' '}
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        <FontAwesomeIcon icon={faTrash} /> {' '}
                        Remover
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
