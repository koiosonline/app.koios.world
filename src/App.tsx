import { Route, HashRouter as Router, Switch, Redirect } from "react-router-dom";
import "./assets/css/koios.scss";
import { Worlds } from "./pages/Worlds";
import { WorldDetail } from "./pages/WorldDetail/WorldDetail";
import { Layout } from "./components/Layout/Layout";
import { Leaderboard } from "./pages/Leaderboard";
import WorldOverview from "./pages/WorldOverview";
import { Profile } from "./pages/Profile";
import { ComingSoon } from "./pages/ComingSoon";
import { useMemo, useState } from "react";
import { UserContext } from "./Context/UserContext";
import { Error404 } from "./pages/Error404";
import Contribute from "./pages/Contribute";
import ScrollToTop from "./components/Util/scrollTop";
import ExplanationVideos from "./pages/ExplanationVideos";
import Earn from "./pages/Earn";
import VacancyDetail from "./pages/VacancyDetail";
import { MarkdownEditor } from "./pages/MarkdownEditor";
import ThreeJsDemo from "./pages/ThreeJsDemo";


export const App = () => {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <Router>
        <UserContext.Provider value={providerValue}>
        <ScrollToTop/>
      <Switch>
        <Route path={["/editor"]} exact >
                <Switch>
                  <Route path="/editor" exact component={MarkdownEditor}/>
                </Switch>
        </Route>

        <Route>
          <Layout>
            <Switch>
                <Route path="/worlds" exact component={Worlds}/>
                <Route path="/worlds/:worldContent" exact component={WorldOverview}/>
                <Route path="/worlds/:worldContent/:worldDetail/:videoSlug?" exact component={WorldDetail}/>
                <Route path="/coming-soon" exact component={ComingSoon} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/leaderboard" exact component={Leaderboard}/>
                <Route path="/contribute" exact component={Contribute}/>
                <Route path="/explanation" exact component={ExplanationVideos}/>
                <Route path="/earn" exact component={Earn} />
                <Route path="/earn/:vacancyDetail" exact component={VacancyDetail} />
                <Route path="/" exact><Redirect to="/worlds"/></Route>
                <Route path="/threejsdemo" exact component={ThreeJsDemo}/>
                <Route component={Error404}/>
            </Switch>
          </Layout>
          </Route>
      </Switch>
        </UserContext.Provider>
    </Router>
  );
};
