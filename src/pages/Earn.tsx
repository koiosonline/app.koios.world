import {useState} from "react";
import VacanciesIntro from "../components/VacanciesIntro";
import earnData from "../assets/data/earn.json";
import partnerData from "../assets/data/earnPartners.json";
import VacancyCard from "../components/VacancyCard";
import {Link} from "react-router-dom";

const Earn = () => {
  const [vacanciesActive, setVacanciesActive] = useState(true)
  const [submissionsActive, setSubmissionsActive] = useState()
  const [activeCat, setActiveCat] = useState('');

  const handleActiveView = (vacancies, submissions) => {
    setVacanciesActive(vacancies)
    setSubmissionsActive(submissions)
  }

  return (
    <>
      <div className={'earn-header'} style={{backgroundImage: 'linear-gradient(to right, rgba(255, 11, 172, 0.5), rgba(47, 18, 220, 0.5)), url(https://i.imgur.com/VpLJxrH.jpg)'}}>
        <div className={'earn-header__text-holder'}>
          <h1 className={'earn-header__text-holder__title'}>{earnData.headerTitle}</h1>
          <p className={'earn-header__text-holder__description'}>{earnData.headerDescription}</p>
        </div>
      </div>

      <div className={'selector-container'}>
        <button onClick={() => handleActiveView(true, false)} className={vacanciesActive ? 'button button--active' : 'button'}>Take on Challenge</button>
        <button onClick={() => handleActiveView(false, true)} className={submissionsActive ? 'button button--active' : 'button'}>Submit a Challenge</button>
        <Link to={'coming-soon'} className={'button'}>Paid micro challenges</Link>
      </div>

      {vacanciesActive &&
        <div className={'vacancies'}>
          <VacanciesIntro title={earnData.title} description={earnData.description}/>

          <div className={'categories'}>
            {earnData.categories.map((button) => {
              return (
                <button className={button.title === activeCat ? 'categories__button categories__button--active' : 'categories__button'} onClick={() => setActiveCat(button.title)}>{button.title}</button>
              )
            })}
          </div>

          <div className={'card-grid'}>
            {earnData.assignments.map((data) => {
              if(activeCat === data.category) {
                return (
                  <VacancyCard
                    title={data.title}
                    link={data.assignmentUrl}
                    imageUrl={data.imageUrl}
                    subTitle={data.subTitle}
                    description={data.description}
                    reimbursement={data.reimbursement}
                    providerLogo={data.providerLogo}
                  />
                )
              }
              if(activeCat === '') {
                return (
                  <VacancyCard
                    title={data.title}
                    link={data.assignmentUrl}
                    imageUrl={data.imageUrl}
                    subTitle={data.subTitle}
                    description={data.description}
                    reimbursement={data.reimbursement}
                    providerLogo={data.providerLogo}
                  />
                )
              }
            })

            }
          </div>
        </div>
      }

      {submissionsActive &&
        <div className={'partner'}>
          <div className={'partner__header'}>
            <h1 className={'title'}>{partnerData.title}</h1>
            <p className={'sub-title'}>{partnerData.subTitle}</p>
            <p className={'appreciation'}>{partnerData.appreciation}</p>
          </div>
          <div>

            <div className={'steps-row'}>
              <h2 className={'steps-row__number'}>1.</h2>
              <div className={'steps-row__text-holder'}>
                <p>{partnerData.one}</p>
                <a href={partnerData.formUrl}>Take me to the form</a>
              </div>
            </div>

            <div className={'steps-row'}>
              <h2 className={'steps-row__number'}>2.</h2>
              <div className={'steps-row__text-holder'}>
                <p>{partnerData.two}</p>
              </div>
            </div>

            <div className={'steps-row'}>
              <h2 className={'steps-row__number'}>3.</h2>
              <div className={'steps-row__text-holder'}>
                <p>{partnerData.three}</p>
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default Earn