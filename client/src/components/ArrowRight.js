import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

function ArrowRight(props) {
    const { className, style, onClick } = props;
  return (
            
            <FontAwesomeIcon icon={faArrowRight} className={className}
            style={{
                ...style,
                display: 'block',
                background: 'transparent',
                color: '#000', 
                fontSize: '1.4em',
            }}
            onClick={onClick} /> 
  );
}

export default ArrowRight;