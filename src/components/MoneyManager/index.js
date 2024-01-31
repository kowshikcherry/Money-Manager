import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import Moneydetails from '../MoneyDetails'
import Transactionitem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const moneydetails = [
  {
    imgurl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    name: 'Your Balance',
    classname: 'color1',
    paratextid: 'balanceAmount',
  },
  {
    imgurl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    name: 'Your Income',
    classname: 'color2',
    paratextid: 'incomeAmount',
  },
  {
    imgurl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    name: 'Your Expenses',
    classname: 'color3',
    paratextid: 'expensesAmount',
  },
]
class MoneyManager extends Component {
  state = {
    list: [],
    balance: 0,
    income: 0,
    expenses: 0,
    name: '',
    value: '',
    type: transactionTypeOptions[0].optionId,
  }
  onAddhistory = event => {
    event.preventDefault()
    const {name, type, value} = this.state
    const newhistory = {
      id: v4(),
      titleoftranscation: name,
      amountoftranscation: value,
      typeoftranscation: type,
    }
    if (type === 'INCOME' && name !== '' && value !== '' && type !== '') {
      this.setState(prevState => ({
        balance: prevState.balance + value,
        income: prevState.income + value,
        name: '',
        value: '',
        list: [...prevState.list, newhistory],
      }))
    } else if (
      type === 'EXPENSES' &&
      name !== '' &&
      value !== '' &&
      type !== ''
    ) {
      this.setState(prevState => ({
        balance: prevState.balance - value,
        expenses: prevState.expenses + value,
        name: '',
        value: '',
        list: [...prevState.list, newhistory],
      }))
    }
  }
  onChangeName = event => {
    this.setState({name: event.target.value})
  }
  onChangevalue = event => {
    const parsvalue = parseInt(event.target.value)
    this.setState({value: parsvalue})
  }
  onChangetype = event => {
    this.setState({type: event.target.value})
  }
  ondelete = (id, amountoftranscation, typeoftranscation) => {
    const {list} = this.state
    const filtertranscation = list.filter(each => {
      if (each.id !== id) {
        return each
      }
    })
    if (typeoftranscation === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance - amountoftranscation,
        income: prevState.income - amountoftranscation,
        list: [...filtertranscation],
      }))
    } else if (typeoftranscation === 'EXPENSES') {
      this.setState(prevState => ({
        balance: prevState.balance + amountoftranscation,
        expenses: prevState.expenses - amountoftranscation,
        list: [...filtertranscation],
      }))
    }
  }

  render() {
    const {list, name, value, balance, income, expenses, type} = this.state

    let hide
    if (list.length !== 0) {
      hide = (
        <ul className="bg6">
          {list.map(each => {
            return (
              <Transactionitem
                key={each.id}
                each={each}
                ondelete={this.ondelete}
              />
            )
          })}
        </ul>
      )
    } else {
      hide = ''
    }

    //console.log(list)
    return (
      <div className="bg1">
        <div className="bg2">
          <h1>hi,richard</h1>
          <p>welcome back to your money manager</p>
        </div>
        <ul className="bg3">
          <>
            <Moneydetails
              classname={moneydetails[0].classname}
              imgurl={moneydetails[0].imgurl}
              chang1value={balance}
              alt="balance"
              name={moneydetails[0].name}
              textid={moneydetails[0].paratextid}
            />
          </>
          <>
            <Moneydetails
              classname={moneydetails[1].classname}
              imgurl={moneydetails[1].imgurl}
              chang1value={income}
              alt="income"
              name={moneydetails[1].name}
              textid={moneydetails[1].paratextid}
            />
          </>
          <>
            <Moneydetails
              classname={moneydetails[2].classname}
              imgurl={moneydetails[2].imgurl}
              chang1value={expenses}
              alt="expenses"
              name={moneydetails[2].name}
              textid={moneydetails[2].paratextid}
            />
          </>
        </ul>
        <div className="bg5">
          <form className="bg4" onSubmit={this.onAddhistory}>
            <div>
              <h1>Add Transaction</h1>
            </div>
            <label htmlFor="title">TITLE</label>
            <input
              value={name}
              onChange={this.onChangeName}
              id="title"
              type="text"
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <input
              value={value}
              onChange={this.onChangevalue}
              id="amount"
              type="text"
            />
            <br />
            <label htmlFor="type">TYPE</label>
            <select value={type} onChange={this.onChangetype} id="type">
              <option value="INCOME">Income</option>
              <option value="EXPENSES">Expenses</option>
            </select>
            <br />
            <button type="submit">Add</button>
          </form>
          <div className="bg4">
            <h1>History</h1>
            <div className="bghistory">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            {hide}
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
