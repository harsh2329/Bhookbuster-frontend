import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UserLogin from '../common/UserLogin';
import UserSignup from '../common/UserSignup';
import 
function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <>
      {showLogin ? 
        <Login switchToSignup={() => setShowLogin(false)} /> : 
        <Signup switchToLogin={() => setShowLogin(true)} />
      }
    </>
  );
}

export default AuthPage;