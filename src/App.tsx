import React from 'react';
import { Header } from './components/Header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { AuthContext } from './helpers/providers/auth';
import { Profile } from './pages/Profile/Profile';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
