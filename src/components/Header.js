import PropTypes from 'prop-types' 
import Button from './Button'
import { useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAddTask}) => {
    const location = useLocation()
    return(
        <header className='header'>
            <h1>{title}</h1> 
            {location.pathname === '/'  && (
              <Button 
                onClick={onAdd} 
                color={showAddTask ? 'red' : 'green'} 
                text={showAddTask ? 'Close' : 'Add'}/>
            )}
        </header> 
    )
}

Header.defaultProps = {
    title: 'Hello'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header 