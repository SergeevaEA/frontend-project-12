import { Button } from 'react-bootstrap'
import { BsArrowRightSquare } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

const EnterButton = ({ disabled }) => {
  const { t } = useTranslation()
  return (
    <Button type="submit" variant="outline-secondary" disabled={disabled} className="btn-group-vertical">
      <BsArrowRightSquare size={20} />
      <span className="visually-hidden">{t('buttons.send')}</span>
    </Button>
  )
}

export default EnterButton
