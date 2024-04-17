import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import DropDown from "./DropDown";
import { IoMdSwap } from "react-icons/io";

const CurrencyConvertor = () => {
    //Currencies -> http://api.frankfurter.app/currencies
    const [currencies, serCurrencies] = useState([]);
    const [amount, setAmount] = useState(null);

    // From To 
    const [fromCurrency, serfromCurrency] = useState("USD");
    const [toCurrency, sertoCurrency] = useState("INR")

    const [convertedAmount, setconvertedAmount] = useState(null)
    const[converting , setConverting] = useState(false)
    useEffect(() => {
        try {
            axios.get("http://api.frankfurter.app/currencies")
                .then(res => serCurrencies(Object.keys(res.data)))
        }
        catch (error) {
            console.log("Dekh k dal na")
        }
        console.log(currencies)
    }, [])

    const handleFavorites = (currency) => {
        // add to favorites
    }

    //Conversion -> http://api.frankfurter.app/latest?amount=1&from=USD&to=INR

    const ConvertCurrency =  async () => {
        try{
            const res = await fetch(
                `http://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await res.json();
            setconvertedAmount(data.rates[toCurrency]+ " " + toCurrency)
        }

        catch(error){
            console.log("error fetch", error)
        }

        finally{
            setConverting(false)
        }
       
    }

    const swapCurrencies = () => {
        serfromCurrency(toCurrency)
        sertoCurrency(fromCurrency)

    }

    return (
        <>
            <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
                <h2 className="mb-5 text-2xl font-semibold text-gray-700">Curreny Converter</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <DropDown currencies={currencies} title="From" handleFavorites={handleFavorites} currency={fromCurrency} setCurrency={serfromCurrency} />
                    {/* swaping currencies button */}
                    <div className="flex justify-center -mb-5 sm:mb-0">
                        <button className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" onClick={(swapCurrencies)}>
                            <IoMdSwap />
                        </button>
                    </div>
                    <DropDown currencies={currencies} title="To" handleFavorites={handleFavorites} currency={toCurrency} setCurrency={sertoCurrency} />
                </div>
                <div className="mt-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 " value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="flex justify-end mt-6">
                    <button className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`} onClick={ConvertCurrency}>Convert</button>
                </div>
                
                { convertedAmount &&( <div className="mt-4 text-lg font-medium text-right text-green-600">Coverted Amount : {convertedAmount}
                </div>
                )}
            </div>
        </>
    )
}
export default CurrencyConvertor;