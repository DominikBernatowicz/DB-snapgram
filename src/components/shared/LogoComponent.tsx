import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type LogoComponentProps = {
  func?: Dispatch<SetStateAction<boolean>>
}

const LogoComponent = ({ func }: LogoComponentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Link to='/' className='flex gap-2 items-center' onClick={() => func && func(false)}>
      <img
        src='/assets/images/logo.svg'
        alt='logo'
        width={45}
        height={30}
        className={`transform transition-all duration-1000 ease-in-out ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
      />
      <div className='flex gap-2 items-center shine'>
        <div className={`logo-wave ${isLoaded ? 'animate' : ''}`}>
          {'InstaVibe'.split('').map((letter, index) => (
            <h1
              key={index}
              className={`inline-block h3-bold animate-wave delay-${index} ${letter === 'V' ? 'text-[#7091E6] shine' : ''}`}
            >
              {letter}
            </h1>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LogoComponent;
