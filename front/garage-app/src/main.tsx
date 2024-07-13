import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Menu from './components/Menu.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <>
    <Menu />
    <div className='container'>
      <App />
    </div>
  </>
);