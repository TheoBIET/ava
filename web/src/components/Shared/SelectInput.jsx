import propTypes from 'prop-types'

export default function SelectInput({
  id,
  options,
  selectedOption,
  setSelectedOption,
  label,
  idKey,
  textKey,
}) {
  return (
    <div className="SelectInput">
      <label htmlFor={id}>{label}</label>
      <select id={label} onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption[idKey]}>
        {options.map((device, index) => (
          <option key={index} value={device[idKey]}>{device[textKey]}</option>
        ))}
      </select>
    </div>
  )
}

SelectInput.propTypes = {
  id: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  selectedOption: propTypes.object.isRequired,
  setSelectedOption: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  idKey: propTypes.string.isRequired,
  textKey: propTypes.string.isRequired,
}