import PropTypes from 'prop-types'

export default function InputSelect({
  options,
  label,
  textKey,
  valueKey,
}) {
  return (
    <div className="InputSelect">
      <label>{label}</label>
      <select>
        {options.map((opt, index) => (
          <option key={index} value={opt[valueKey]}>{opt[textKey]}</option>
        ))}
      </select>
    </div>
  )
}

InputSelect.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  textKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
}