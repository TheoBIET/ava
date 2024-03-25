import { Link } from "../../constants/links";
import { IoLogOutOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navigation({ links }: Readonly<{
  links: Link[]
}>) {
  const { pathname } = useLocation();

  const getLinksByCategory = () => {
    return links.reduce((acc, link) => {
      if (!acc[link.category]) acc[link.category] = [];
      acc[link.category].push(link);
      return acc;
    }, {} as { [key: string]: Link[] });
  }

  return (
    <nav className="Navigation">
      <h3 className="Navigation__title">ava</h3>
      <ul className="Navigation__links">
        {Object.entries(getLinksByCategory()).map(([category, links], index) => (
          <ul key={index} className="Navigation__links__category">
            <h4 className="Navigation__links__category__title">{category}</h4>
            {links.map((link, index) => (
              <a
                href={link.path}
                key={index}
                className={`Navigation__links__category__item ${pathname == link.path ? '--active' : ''}`}
                target={link.isExternal ? '_blank' : ''}
                rel="noreferrer"
              >
                <span className="Navigation__links__category__item__icon">{<link.icon />}</span>
                <span className="Navigation__links__category__item__title">{link.title}</span>
              </a>
            ))}
          </ul>
        ))}
      </ul>
      <li className="Navigation__links__category --quit">
        <a className="Navigation__links__category__item" href="/" rel="noreferrer">
          <span className="Navigation__links__category__item__icon --quit">{<IoLogOutOutline /> }</span>
          <span className="Navigation__links__category__item__title">Return to Home</span>
        </a>
      </li>
    </nav>
  )
}

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      isExternal: PropTypes.bool,
    })
  ).isRequired,
}