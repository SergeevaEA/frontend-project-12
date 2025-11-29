import { Button } from 'react-bootstrap'
import { BsPlusSquare } from "react-icons/bs"
import { useTranslation } from 'react-i18next';

const PlusButton = ({onClick}) => {
    const { t } = useTranslation()
    return (
    <Button onClick={onClick} type="button" variant="link" className="p-0 text-primary btn-group-vertical" style={{ boxShadow: 'none', outline: 'none' }}>
        <BsPlusSquare size={20} />
        <span className="visually-hidden">{t('buttons.plus')}</span>
    </Button>)
}

export default PlusButton