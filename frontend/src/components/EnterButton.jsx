import { Button } from 'react-bootstrap'
import { BsArrowRightSquare } from 'react-icons/bs'

const EnterButton = ({ disabled }) => {
    return (
        <Button type="submit" variant="outline-secondary" disabled={disabled} className="btn-group-vertical">
            <BsArrowRightSquare size={20} />
            <span className="visually-hidden">Отправить</span>
        </Button>
    )
}

export default EnterButton