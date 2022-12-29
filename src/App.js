import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [password, setPassword] = useState('')
  const [passPoints, setPassPoints] = useState(0);

  useEffect(() => {
    const numberInput = document.getElementById('numInput')?.checked,
          upperInput = document.getElementById('uppInput')?.checked,
          lowerInput = document.getElementById('lowInput')?.checked,
          symbolInput = document.getElementById('symInput')?.checked,
          lengthInp = document.querySelector('.charLengthSelector')?.value

    let points = 0 +
      (numberInput ? 1 : 0) +
      (upperInput ? 4 : 0) +
      (lowerInput ? 2 : 0) +
      (symbolInput ? 3 : 0) +
      (lengthInp < 6 ? -7 : (lengthInp - 6))

      setPassPoints(points)

  }, [password])

  const generatePassword = () => {

    let generatedPass = '';

    const possibleChars = {
      numbers: {
        asciiLow: 48,
        asciiHigh: 57
      },
      uppLetters: {
        asciiLow: 65,
        asciiHigh: 90
      },
      lowLetters: {
        asciiLow: 97,
        asciiHigh: 122
      },
      symbols: {
        asciiLow: 33,
        asciiHigh: 47
      }
    }

    const numberInput = document.getElementById('numInput').checked,
          upperInput = document.getElementById('uppInput').checked,
          lowerInput = document.getElementById('lowInput').checked,
          symbolInput = document.getElementById('symInput').checked,
          lengthInp = document.querySelector('.charLengthSelector').value

    const selectedOptions = [
      ...numberInput ? ['numbers'] : [],
      ...upperInput ? ['uppLetters'] : [],
      ...lowerInput ? ['lowLetters'] : [],
      ...symbolInput ? ['symbols'] : []
    ]

    selectedOptions.forEach(item => {
      let minAscii = possibleChars[item].asciiLow,
          maxAscii = possibleChars[item].asciiHigh,
          asciiCode = Math.floor(Math.random() * ((maxAscii + 1) - minAscii) + minAscii)
      generatedPass += String.fromCharCode(asciiCode)
    })
    
    for(let i = 0; i < lengthInp - selectedOptions.length; i++){
      const type = selectedOptions[Math.floor(Math.random() * (selectedOptions.length))]
      let minAscii = possibleChars[type].asciiLow,
          maxAscii = possibleChars[type].asciiHigh,
          asciiCode = Math.floor(Math.random() * ((maxAscii + 1) - minAscii) + minAscii)
      generatedPass += String.fromCharCode(asciiCode)
    }

    setPassword(generatedPass.split('').sort(() => 0.5 - Math.random()).join(''))
  }

  const updateLengthCount = (e) => {
    document.querySelector('.charLengthNumber').textContent = e.target.value
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className='passwordDiv'>
        <span className='passwordDivText'>{password}</span>
        <button className='copyPasswordBtn' onClick={copyPassword}>C</button>
      </div>
      <div className="passwordGenerator">
        <div className="generatorCharLength">
          <span className='charLengthText'>Character Length</span>
          <span className='charLengthNumber'>{document.querySelector('.charLengthSelector')?.value}</span>
          <input type="range" name="charLength" className='charLengthSelector' min={4} max={24} onChange={updateLengthCount}/>
        </div>
        <div className='passwordAttInput'>
          <input type="checkbox" name="passwordUpp" className='passwordInput' id='uppInput'/>
          <label htmlFor="uppInput">Include Uppercase Letters</label>
        </div>
        <div className='passwordAttInput'>
          <input type="checkbox" name="passwordLow" className='passwordInput' id='lowInput'/>
          <label htmlFor="lowInput">Include Lowercase Letters</label>
        </div>
        <div className='passwordAttInput'>
          <input type="checkbox" name="passwordSum" className='passwordInput' id='numInput'/>
          <label htmlFor="numInput">Include Numbers</label>
        </div>
        <div className='passwordAttInput'>
          <input type="checkbox" name="passwordSym" className='passwordInput' id='symInput'/>
          <label htmlFor="symInput">Include Symbols</label>
        </div>
        <div className="passwordStrength">
          <span>Strength</span>
          <div className="passwordStrengthGraph">
            <span className='passwordStrengthText'>
              {
                passPoints < 5 ? 'Weak' :
                passPoints < 7 ? 'Medium' : 
                passPoints < 10 ? 'Strong' :
                'Very Strong'
              }
            </span>

          </div>
        </div>
        <button onClick={generatePassword}>Generate</button>
      </div>
    </div>
  );
}

export default App;
