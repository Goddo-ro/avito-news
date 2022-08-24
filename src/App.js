import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import News from "./pages/News"
import SingleNews from "./pages/SingleNews"
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <News />
        </Route>
        <Route path="/news/:newsId">
          <SingleNews />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
