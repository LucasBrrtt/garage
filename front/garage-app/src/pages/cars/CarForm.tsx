import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/car'
import { AxiosError } from 'axios';

interface CarObject {
    id?: string;
    name: string;
    brandId: number;
    color: string;
    plate: string;
    year: string;
}

interface Option {
    id: string;
    name: string;
}

export default function CarForm() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [plate, setPlate] = useState("");
    const [year, setYear] = useState("");

    const [options, setOptions] = useState<Option[]>([]);

    async function handleSubmit() {
        let carObject: CarObject = {
            name: name,
            brandId: Number(brand),
            color: color,
            plate: plate,
            year: year
        }

        try {
            if (id) {
                carObject.id = id;
                await api.put(`car/${id}`, carObject);
            } else {
                await api.post('car', carObject);
            }

            navigate("/", { replace: true })
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log('Erro Axios:', err.message);
                console.log('Status do erro:', err.response?.status);
            } else {
                console.error('Erro desconhecido:', err);
            }
        }
    }

    const getCars = async () => {
        const response = await api.get(`car/${id}`)
        return response.data
    }

    const getBrands = async () => {
        const response = await api.get(`brand`)
        return response.data
    }

    useEffect(() => {
        if (id) {
            const getCarsValue = async () => {
                const value = await getCars();

                if (value) {
                    setName(value.name)
                    setBrand(value.brand.id)
                    setColor(value.color)
                    setPlate(value.plate)
                    setYear(value.year)
                }
            };
            getCarsValue();
        }

        const getBrandsValue = async () => {
            const value = await getBrands();
            setOptions(value)
        }
        getBrandsValue();
    }, []);

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
                    <Form.Control type="text" placeholder="NOME DO CARRO" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Select aria-label="Default select example"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <option>Open this select menu</option>
                        {options.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="color">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control type="text" placeholder="COR DO CARRO" value={color} onChange={(e) => setColor(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="plate">
                    <Form.Label>Placa</Form.Label>
                    <Form.Control type="text" placeholder="PLACA DO CARRO" value={plate} onChange={(e) => setPlate(e.target.value.slice(0, 7))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="text" placeholder="ANO DO CARRO" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))} />
                </Form.Group>
            </Form>

            <div>
                <Button variant="success" onClick={async () => await handleSubmit()}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> {' '}
                    Salvar
                </Button>
            </div>

        </>
    )
}
