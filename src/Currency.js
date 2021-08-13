function Currency(props) {
  
    const {options,selectedCurrency,onChangeCurrency,amount,onChangeAmount}=props

    return (
        <div className="flex justify-center items-center m-5">
            <input value={amount} onChange={onChangeAmount} className="input w-30 p-1 border-2 border-black  focus:border-blue-600 rounded h-10" type="number"/>
            <select value={selectedCurrency} onChange={onChangeCurrency} className="p-1 ml-3 border-2 border-black focus:border-blue-600 rounded h-10 ">
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
               
            </select>
        </div>
    )
}

export default Currency
