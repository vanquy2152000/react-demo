import './App.scss';
import Header from './component/Header/Header';
import { Link } from "react-router-dom";

const App = () => {

  return (
    <div className="app-container">
      <Header />
      <div>
        test component
        <div>
          <button>
            <Link to="/users">go to users page</Link>
          </button>
          <button>
            <Link to="/admins">go to admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
