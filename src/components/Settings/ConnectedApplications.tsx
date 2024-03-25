import { applications } from "../../constants/applications";

export default function ConnectedApplications() {
  return (
    <div className="ConnectedApplications">
      <h3>Active applications</h3>
      <ul className="ConnectedApplications__list">
        {applications.map((application) => (
          <li className="ConnectedApplications__list__item" key={application.key}>
            <img className="ConnectedApplications__list__item__icon" src={`/images/icons/${application.key}.svg`} alt={application.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}