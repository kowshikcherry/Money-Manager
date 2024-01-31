import './index.css'
const Moneydetails = props => {
  const {imgurl, classname, chang1value, alt, name, textid} = props
  return (
    <li className={classname}>
      <img alt={alt} className="img" src={imgurl} />
      <div>
        <p>{name}</p>
        <p data-testid={textid}>Rs {chang1value}</p>
      </div>
    </li>
  )
}
export default Moneydetails
