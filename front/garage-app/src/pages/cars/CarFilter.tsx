import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import api from '../../api/car'

interface FilterProps {
    onFormChange: any;
    formFilterValues: any;
}

interface CarObject {
    id?: string;
    name: string;
    brand: string;
    color: string;
    plate: string;
    year: string;
}

interface Option {
    id: string;
    name: string;
}

export default function CarFilter({ onFormChange, formFilterValues }: FilterProps) {
    const [name, setName] = useState(formFilterValues.carName ? formFilterValues.carName : "");
    const [brand, setBrand] = useState(formFilterValues.brandId ? formFilterValues.brandId : "");
    const [color, setColor] = useState(formFilterValues.color ? formFilterValues.color : "");
    const [plate, setPlate] = useState(formFilterValues.plate ? formFilterValues.plate : "");
    const [year, setYear] = useState(formFilterValues.year ? formFilterValues.year : "");

    const [options, setOptions] = useState<Option[]>([]);
    const [optionState, setOptionState] = useState(true);

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

        if(optionState){
            const getBrandsValue = async () => {
                const value = await getBrands();
                setOptions(value)
            }
            getBrandsValue();
            setOptionState(false);
        }

        onFormChange(carObject);
    }, [name, brand, color, plate, year]);

    const getBrands = async () => {
        const response = await api.get(`brand`)
        return response.data
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="NOME DO CARRO"
                    autoFocus
                    value={name}
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Marca</Form.Label>
                    <Form.Select aria-label="Default select example" 
                    value={brand}
                    onChange={(e) => handleChange(e.target.value, 'brand')}
                    >
                        <option value={""}>Nenhum</option>
                        {options.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="MARCA DO CARRO"
                    value={brand}
                    onChange={(e) => handleChange(e.target.value, 'brand')}
                />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="color">
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
