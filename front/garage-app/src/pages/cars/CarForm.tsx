import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export default function CarForm() {
    let { id } = useParams();

    return (
        <>
            <Title title={id ? 'Editar Carro' : 'Adicionar Carro'} >
                <Link to={"/"}>
                    <Button variant='secondary'>
                        <FontAwesomeIcon icon={faArrowLeft} /> {' '}
                        Voltar

                    </Button>
                </Link>
            </Title>

            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="NOME DO CARRO" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder="MARCA DO CARRO" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="color">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control type="text" placeholder="COR DO CARRO" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="plate">
                    <Form.Label>Placa</Form.Label>
                    <Form.Control type="text" placeholder="PLACA DO CARRO" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="text" placeholder="ANO DO CARRO" />
                </Form.Group>
            </Form>

            <div>
                <Button variant="success">
                    <FontAwesomeIcon icon={faFloppyDisk} /> {' '}
                    Salvar
                </Button>
            </div>

        </>
    )
}
