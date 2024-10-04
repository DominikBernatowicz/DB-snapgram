import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthLayout = () => {
  const isAuthenticated = false; // Zastąp tym, co używasz do sprawdzania autoryzacji
  const navigate = useNavigate()

  const [isSignIn, setIsSignIn] = useState(true); // Kontroluje, który formularz jest wyświetlany
  const [isMounted, setIsMounted] = useState(false); // Stan do animacji

  // Zmiana formularza
  const toggleForm = () => {
    setIsMounted(false); // Rozpocznij animację wyjścia
    setTimeout(() => {
      if (isSignIn) {
        navigate('/sign-up')
      } else {
        navigate('/sign-in')
      }
      setIsSignIn(!isSignIn); // Zmień formularz
      setIsMounted(true); // Rozpocznij animację wejścia
    }, 500); // Czas trwania animacji wyjścia
  };

  useEffect(() => {
    setIsMounted(true); // Ustaw formularz na zamontowany przy pierwszym renderowaniu
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <div className={`transition-all duration-500 ${isMounted ? 'animate-slide-in' : 'animate-slide-out'}`}>
            <Outlet context={{ isSignIn, toggleForm }} /> {/* Przekaż isSignIn i toggleForm do komponentów dzieci */}
          </div>
        </section>
      )}
    </>
  );
};

export default AuthLayout;
