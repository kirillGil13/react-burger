import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import data from './utils/data';

function App() {
  return (
    <div className="app">
      <AppHeader />
      
      <main>
        <BurgerConstructor data={data} />
        <BurgerIngredients data={data}/>
      </main>
    </div>
  );
}

export default App;
