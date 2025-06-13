import { Link } from 'react-router-dom';
import cglogo from './cglogo.png'

function CgLogo() {
  return (
    <Link to='/' className='flex items-center space-x-2 cursor-pointer'>
      <img
        alt="logo"
        src={cglogo}
        className="h-8 w-auto"
      />
      <label className='font-mono text-gray-300 text-lg font-bold cursor-pointer hidden lg:flex'>CyberGod™</label>
    </Link>
  )
}
export default CgLogo;