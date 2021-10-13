import { Link } from 'react-router-dom';
import {Icon} from "../Util/Icon";
import World from "./World";
import {useEffect, useState} from "react";

const WorldCard = (props: {image: string; title: string; description: string; linkUrl: string; linkTitle: string; duration: string;}) => {
  const [hoverState, setHoverState] = useState(false)

  const hoverHandler = (state: string) => {
    if (state === 'enter') {
      setHoverState(true)
    }
    if (state === 'leave') {
      setHoverState(false)
    }
  }

  return (
    <Link to={props.linkUrl} className={"cardContainer__card"} onMouseEnter={() => hoverHandler('enter')} onMouseLeave={() => hoverHandler('leave')}>
      <World world={4} animate={hoverState} />
      <div className={"cardContainer__card__text"}>
        <h2 className={"cardContainer__card__text__title"}>{props.title}</h2>
        <div className={'cardContainer__card__text__metaData'}>
          <p><Icon type="time" className={'clock'}/>{Math.floor(parseInt(props.duration) / 60)} Min</p>
        </div>
      </div>
      <p className={"cardContainer__card__description"}>{props.description}</p>
      {/*<Link to={props.linkUrl} className={"cardContainer__card__link"}><p>{props.linkTitle}</p></Link>*/}
    </Link>
  )
}

export default WorldCard;
