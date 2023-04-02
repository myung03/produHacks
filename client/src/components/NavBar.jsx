import { useState, React} from 'react';
import style from '../style';
import { hamb, close, logo } from '../../assets/index';

const Navbar = () => {
    const [toggle, setToggle ] = useState(false)
  return (

    <div className={`flex justify-between align-middle ${style.paddingX} ${style.paddingY} mb-[5px]`}>
        <img src={logo} alt="logo" className="w-[30px] h-[40px]"/>

        <div className="sm:hidden flex flex-1 justify-end items-center">
            <img src={toggle ? close : hamb}
            alt="menu"
            className="w=[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle((prev) => !prev)}/>
          </div>

          <div 
          className={`${toggle ? 'flex' : 'hidden'} p-6 dot-gradient absolute top-14 right-0 mx-4 my-2
          min-w-[140px] rounded sidebar glassmorphism`}>
              <ul className="text-black list-none flex flex-col gap-4 justify-end items-center flex-1">
            <li>Login</li>
            <li>Register</li>
          </ul>
          </div>
    </div>
  )
}

export default Navbar