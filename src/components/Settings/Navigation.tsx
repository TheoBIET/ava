import { IoLogOutOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Navigation({ links }: { links: { path: string, icon: string, isExternal?: boolean }[] }) {
  const { pathname } = useLocation();

  return (
    <nav className="Navigation">
      <h3 className="Navigation__title">ava</h3>
      <ul className="Navigation__links">
        {links.map((link, index) => (
          <a
            href={link.path}
            key={index}
            className={`Navigation__links__item ${pathname == link.path ? '--active' : ''}`}
            target={link.isExternal ? '_blank' : ''}
            rel="noreferrer"
          >
            <link.icon />
          </a>
        ))}
      </ul>
      <li className="Navigation__links__item --quit">
        <a href="/">
          <IoLogOutOutline />
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