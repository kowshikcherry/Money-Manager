import './index.css'
const Transactionitem = props => {
  const {each, ondelete} = props
  const {id, titleoftranscation, amountoftranscation, typeoftranscation} = each
  const del = () => {
    ondelete(id, amountoftranscation, typeoftranscation)
  }
  let other
  if (typeoftranscation === 'INCOME') {
    other = 'Income'
  } else {
    other = 'Expenses'
  }
  return (
    <li className="listhistory">
      <p>{titleoftranscation}</p>
      <p>Rs {amountoftranscation}</p>
      <p>{other}</p>
      <button onClick={del} data-testid="delete">
        <img
          className="deleteimg"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}
export default Transactionitem
