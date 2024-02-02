import './index.css'

const PasswordManagerItem = props => {
  const {passwordDetails, deleteExistingPassword, isActive} = props
  const {id, website, userName, password, newColor} = passwordDetails

  const clickDeleteButton = () => {
    deleteExistingPassword(id)
  }

  return (
    <li className="list-style">
      <div className="logo-content-container">
        <div className={`logo-container ${newColor}`}>
          <p>{website.slice(0, 1)}</p>
        </div>
        <div>
          <p className="website-style">{website}</p>
          <p className="username-style">{userName}</p>
          {isActive ? (
            <p className="password-style">{password}</p>
          ) : (
            <img
              className="masked-password-style"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        data-testid="delete"
        className="delete-button-style"
        onClick={clickDeleteButton}
      >
        <img
          className="delete-image-style"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordManagerItem
