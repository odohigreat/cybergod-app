import cglogo from './cglogo.png'

function CgLogo() {
  return (
    <div className='flex items-center space-x-2'>
      <img
        alt="logo"
        src={cglogo}
        className="h-8 w-auto"
      />
      <label className='font-mono text-gray-300 text-lg font-bold hidden lg:flex'>CyberGod™</label>
    </div>
  )
}
export default CgLogo;