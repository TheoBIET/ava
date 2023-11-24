import PropTypes from 'prop-types'

export default function Navigation({ links, active, handle }) {
  return (
    <nav className="Navigation">
      <ul className="Navigation__links">
        {links.map((link) => (
          <li className={`Navigation__links__item ${link.name === active ? '--active' : ''}`} key={link.name} onClick={() => handle(link.name)}>
            <link.icon className="Navigation__links__item__icon" />
          </li>
        ))}
      </ul>
    </nav>
  )
}

Navigation.propTypes = {
  active: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
}