import data from "../assets/data/learnToNavigate.json";
import QuickLinks from "./QuickLinks";
import { store } from "./Util/Storage";

const LearnToNavigate = (props) => {
  const continueLearning = store.getJson("lastWatched");

  return (
    <div className={"learnToNavigate-container"}>
      <div className={"learnToNavigate"}>
        <h2 className={"learnToNavigate__title"}>{data.title}</h2>
        <p className={"learnToNavigate__description"}>{data.description}</p>
        <div className={"links"}>
          {continueLearning && (
            <div className={"continue"}>
              <a href={"#/worlds/" + continueLearning.world + "/" + continueLearning.level + continueLearning.video}>
                Continue learning
              </a>
            </div>
          )}
          <QuickLinks data={props.world?.quickLinks} />
        </div>
      </div>
      <div className={"image"}>
        <img src={props.world.logo} alt="A logo that represents the course and world" />
      </div>
    </div>
  );
};

export default LearnToNavigate;
