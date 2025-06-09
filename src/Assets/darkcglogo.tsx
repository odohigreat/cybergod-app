import { Link } from 'react-router-dom';
import darkcglogo from './darkcglogo.png'

function DarkCgLogo() {
  return (
    <Link to='/' className='flex items-center space-x-2'>
      <img
        alt="logo"
        src={darkcglogo}
        className="h-8 w-auto"
      />
      <label className='font-mono text-gray-800 text-lg font-bold hidden lg:flex'>CyberGod™</label>
    </Link>
  )
}
export default DarkCgLogo;