import { Link } from 'react-router-dom'
import { Settings, Timer, Home, MessageSquare } from 'lucide-react'

const NavMenu = () => {

    return(
        <div className="navMenu">
            <div className="buttonContainers">
                <Link to="/settings">
                    <button type="button" className="buttons"> 
                        <Settings size={55}/> 
                    </button>
                </Link>
                <Link to="/">
                    <button type='button' className='buttons'>
                        <Home size={55}/>
                    </button>
                </Link>
                <Link to="/pomodoro">
                    <button type="button" className="buttons">
                        <Timer size={55}/>
                    </button>
                </Link>
                <Link to="/feedback">
                    <button type='button' className='buttons'>
                        <MessageSquare size={55}/>
                    </button>
                </Link>
            </div>
        </div>
    )
};

export default NavMenu;