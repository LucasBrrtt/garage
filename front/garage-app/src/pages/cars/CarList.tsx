import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTimes, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/car'
import { AxiosError } from 'axios';
import { FormControl, InputGroup, Form } from 'react-bootstrap';
import ModalComponet from '../../components/Modal';
import CarFilter from './CarFilter';

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
    const [carListAux, setCarListAux] = useState<CarProps[]>([])
    const [carToDelete, setCarToCarDelete] = useState(Object)
    const [show, setShow] = useState(false)
    const [openModalComponet, setOpenModalComponet] = useState(false)

    function handleShowDeleteModal(item: object) {
        setCarToCarDelete(item)
        setShow(true)
    }

    function handleCloseDeleteModal() {
        setShow(false)
    }

    const getCars = async () => {
        const response = await api.get('car')
        return response.data
    }

    async function handleDelete() {
        try {
            await api.delete(`car/${carToDelete.id}`)
            setShow(false)

            const value = await getCars();
            setCarList(value)
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log('Erro Axios:', err.message);
                console.log('Status do erro:', err.response?.status);
            } else {
                console.error('Erro desconhecido:', err);
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = carListAux.filter((name) => {
            return Object.values(name)
                .join(' ')
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });

        setCarList(searchValue)
    };

    const handleFilter = (updatedData: any) => {
        console.log(updatedData);  
    };

    useEffect(() => {
        const getCarsValue = async () => {
            const value = await getCars();
            if (value) {
                setCarList(value);
                setCarListAux(value);
            }
        };
        getCarsValue();
    }, [])

    return (
        <>
            <Title title={'Lista de Carros'}>
                <Link to={"/detalhe"}>
                    <Button variant='success'>
                        <FontAwesomeIcon icon={faPlus} /> {' '}
                        Adicionar Carro

                    </Button>
                </Link>
            </Title>
            <InputGroup className='mt-3 mb-3'>
                <InputGroup.Text>Buscar:</InputGroup.Text>
                <FormControl
                    onChange={handleInputChange}
                    placeholder='Buscar por um carro'
                    className='me-3'
                />
                <div>
                    <Button variant='primary' style={{ borderRadius: '0.375rem' }} onClick={() => setOpenModalComponet(true)}>
                        <FontAwesomeIcon icon={faFilter} /> {' '}
                        Filtro

                    </Button>
                </div>

            </InputGroup>
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

            <ModalComponet
                isOpen={openModalComponet}
                setModalOpen={() => setOpenModalComponet(!openModalComponet)}
            >
                <CarFilter
                    onFormChange={ handleFilter }
                 />
            </ModalComponet>

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
                    <Button variant="danger" onClick={async () => await handleDelete()}>
                        <FontAwesomeIcon icon={faTrash} /> {' '}
                        Remover
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
