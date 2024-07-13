import { useState } from 'react';
import Title from '../../components/Title';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const cars = [
    {
        id: 1,
        nome: 'Uno',
        marca: 'Fiat',
        cor: 'Preto',
        placa: '123',
        ano: '1999'
    },
    {
        id: 2,
        nome: 'Fusca',
        marca: 'Fiat',
        cor: 'Preto',
        placa: '123',
        ano: '1999'
    }
];

export default function CarList() {
    const [carToDelete, setCarToCarDelete] = useState(Object)
    const [show, setShow] = useState(false);

    function handleShowDeleteModal(item: object) {
        setCarToCarDelete(item)
        setShow(true)
    }

    function handleCloseDeleteModal() {
        setShow(false)
    }

    function handleDelete() {
        console.log(carToDelete);
    }

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
                    {cars.map((x) => (
                        <tr key={x.id}>
                            <td>{x.nome}</td>
                            <td>{x.marca}</td>
                            <td>{x.cor}</td>
                            <td>{x.placa}</td>
                            <td>{x.ano}</td>
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
