import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()
    return (
        <footer>
            <h4>Copyright &copy; 2022</h4>
            {location.pathname === '/' ? <Link to='/about'>About</Link> :
                <Link to='/'>Go Back</Link>}
        </footer>
    )
}

export default Footer