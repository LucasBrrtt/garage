import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface FilterProps {
    onFormChange: any;
}

interface CarObject {
    id?: string;
    name: string;
    brand: string;
    color: string;
    plate: string;
    year: string;
}

export default function CarFilter({ onFormChange }: FilterProps) {

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [plate, setPlate] = useState("");
    const [year, setYear] = useState("");

    const handleChange = (e: any, x: string) => {
        switch (x) {
            case 'name':
                setName(e);
                break;
            case 'brand':
                setBrand(e);
                break;
            case 'color':
                setColor(e);
                break;
            case 'plate':
                setPlate(e);
                break;
            case 'year':
                setYear(e);
                break;
            default:
                return;
        }
    };

    useEffect(() => {
        const carObject: CarObject = {
            name,
            brand,
            color,
            plate,
            year,
        };

        onFormChange(carObject);
    }, [name, brand, color, plate, year]);

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="NOME DO CARRO"
                    autoFocus
                    value={name}
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="MARCA DO CARRO"
                    value={brand}
                    onChange={(e) => handleChange(e.target.value, 'brand')}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Cor</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="COR DO CARRO"
                    value={color}
                    onChange={(e) => handleChange(e.target.value, 'color')}

                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Placa</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="PLACA DO CARRO"
                    value={plate}
                    onChange={(e) => handleChange(e.target.value, 'plate')}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ANO DO CARRO"
                    value={year}
                    onChange={(e) => handleChange(e.target.value, 'year')}
                />
            </Form.Group>
        </Form>
    );
}
