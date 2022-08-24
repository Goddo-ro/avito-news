import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./components/Header"
import News from "./pages/News"
import SingleNews from "./pages/SingleNews"
import './App.css';

function App() {
  return (
    <>
      <Header />
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
    </>
  );
}

export default App;
