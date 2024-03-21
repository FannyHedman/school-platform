
import './App.css';
import NavBar from './components/Navbar';
import { LanguageProvider } from './components/language/LanguageContext';
import HomePage from './pages/homePage';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
      <NavBar />
      <HomePage/>
      </LanguageProvider>
    </div>
  );
}

export default App;
