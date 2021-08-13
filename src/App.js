import { useEffect,useState } from 'react';
import './App.css';
import Currency from './Currency';
import Footer from './Footer';
import Header from './Header';

function App() {

  const [options, setOptions]=useState([]);
  const [fromCurrency, setFromCurrency]=useState()
  const [toCurrency, setToCurrency]=useState()
  const [exchangeRate,setExchangeRate]=useState()
  const [amount, setAmount]=useState(1)
  const [amountFromCurrency,setAmountFromCurrency]=useState(true)

  let toAmount,fromAmount
  if(amountFromCurrency){
    fromAmount=amount
    toAmount=amount * exchangeRate || 0
  }
  else{
    toAmount=amount
    fromAmount=amount / exchangeRate

  }



  console.log(exchangeRate);

  const url= "http://api.exchangeratesapi.io/v1/latest?access_key=3e088174ea5e0f9d30581332a404390d"

  useEffect(() => {
    fetch(url)
     .then(res => res.json())
     .then(data => {
      
      const india = Object.keys(data.rates)[66]
       setOptions([data.base,...Object.keys(data.rates)])
       setFromCurrency(data.base)
       setToCurrency(india)
       setExchangeRate(data.rates[india])
     })


  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
   fetch(`${url}&from=${fromCurrency}&symbols=${toCurrency}`)
    .then(res =>res.json())
    .then(data => setExchangeRate(data.rates[toCurrency])
 
    )}
 

  },[fromCurrency,toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }



  return (
    <div className="App  h-screen ">
      <Header/>
      <div className="flex justify-center items-center flex-col h-5/6 bg-opacity-25  bg-cover " style={{ backgroundImage: `url('../img/topography.svg')` }}>
      
      <h1 className=" text-6xl text-center m-5  ">Convert</h1>
      <Currency options={options} 
       selectedCurrency={fromCurrency}
       onChangeCurrency={e => setFromCurrency(e.target.value)}
       amount={fromAmount}
       onChangeAmount={handleFromAmountChange}/>
      <div className="text-6xl text-center  ">=</div>
      <Currency className="m-5" options={options} 
       selectedCurrency={toCurrency} 
       onChangeCurrency={e => setToCurrency(e.target.value)}
       amount={toAmount}
       onChangeAmount={handleToAmountChange}/>
       </div>
       <Footer/>
    </div>
  );
}

export default App;
