import { Button } from 'react-bootstrap'
import { BsPlusSquare } from "react-icons/bs"

const PlusButton = ({onClick}) => {
    return (
    <Button onClick={onClick} type="button" variant="link" className="p-0 text-primary btn-group-vertical" style={{ boxShadow: 'none', outline: 'none' }}>
        <BsPlusSquare size={20} />
        <span className="visually-hidden">+</span>
    </Button>)
}

export default PlusButton