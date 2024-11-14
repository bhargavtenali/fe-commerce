import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 mt-4">
        <Switch>
          <Route exact path="/" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
