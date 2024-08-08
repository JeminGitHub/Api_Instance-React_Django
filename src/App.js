
import './App.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemFom';
import requests from './Api/request';

function App() {
  return (
    <div className="App">
          <ItemForm fetchUrl={requests}  />
          <ItemList fetchUrl={requests} />
    </div>
  );
}

export default App;
