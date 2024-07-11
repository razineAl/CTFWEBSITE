import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

function ArrowLeft(props) {
    const { className, style, onClick } = props;
  return (

            
            <FontAwesomeIcon icon={faArrowLeft} className={className}
            style={{
                ...style,
                display: 'block',
                background: 'transparent',
                color: '#000', 
                fontSize: '1.4em',
                
            }}
            onClick={onClick}/> 
  );
}
export default ArrowLeft;