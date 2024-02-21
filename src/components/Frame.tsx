export default function Frame() {
  return (
    <header className="Frame">
      <div className="Frame__container">
        <h1 className="Frame__container__title">ava</h1>
        <div className="Frame__container__version">
          <span className="Frame__container__version__number">v0.0.1</span>
          <span className="Frame__container__version__icon">🚀</span>
        </div>
      </div>
      <div className="Frame__actions">
        <button className="Frame__actions__button">-</button>
        <button className="Frame__actions__button">[]</button>
        <button className="Frame__actions__button">X</button>
      </div>
    </header>
  )
}