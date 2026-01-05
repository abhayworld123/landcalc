import { useState, useEffect } from 'react'

const regionalUnits = {
  standard: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  north: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 9070, name: 'Bigha (Punjab)' },
    marla: { rate: 272.25, name: 'Marla' },
    kanal: { rate: 5445, name: 'Kanal' },
    gaj: { rate: 9, name: 'Gaj/Gaz' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  up: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 27225, name: 'Bigha (UP)' },
    biswa: { rate: 1361.25, name: 'Biswa' },
    biswansi: { rate: 68.0625, name: 'Biswansi' },
    gaj: { rate: 9, name: 'Gaj/Gaz' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  uttarakhand_plains: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 27000, name: 'Bigha (Plains)' },
    biswa: { rate: 1350, name: 'Biswa' },
    biswansi: { rate: 67.5, name: 'Biswansi' },
    gaj: { rate: 9, name: 'Gaj/Gaz' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  uttarakhand_hills: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 43200, name: 'Bigha (Hills)' },
    nali: { rate: 2160, name: 'Nali' },
    gaj: { rate: 9, name: 'Gaj/Gaz' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  rajasthan: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 27225, name: 'Bigha (Rajasthan)' },
    biswa: { rate: 1361.25, name: 'Biswa' },
    pucca_bigha: { rate: 17424, name: 'Pucca Bigha' },
    gaj: { rate: 9, name: 'Gaj/Gaz' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  bihar_jharkhand: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    katha: { rate: 1361.25, name: 'Katha (Bihar)' },
    kattha: { rate: 1361.25, name: 'Kattha' },
    dhur: { rate: 68.0625, name: 'Dhur' },
    bigha: { rate: 27225, name: 'Bigha (Bihar)' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  west_bengal: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 14400, name: 'Bigha (WB)' },
    katha: { rate: 720, name: 'Katha (WB)' },
    cottah: { rate: 720, name: 'Cottah' },
    chittak: { rate: 45, name: 'Chittak' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  assam: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 14400, name: 'Bigha (Assam)' },
    katha: { rate: 2880, name: 'Katha (Assam)' },
    lecha: { rate: 144, name: 'Lecha' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  maharashtra: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    guntha: { rate: 1089, name: 'Guntha' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' },
    bigha: { rate: 12000, name: 'Bigha (Maharashtra)' }
  },
  gujarat: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 17424, name: 'Bigha (Gujarat)' },
    vigha: { rate: 17424, name: 'Vigha' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  },
  south: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    cent: { rate: 435.6, name: 'Cent' },
    ground: { rate: 2400, name: 'Ground' },
    guntha: { rate: 1089, name: 'Guntha' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' },
    ankanam: { rate: 72, name: 'Ankanam (Kerala)' }
  },
  madhya_pradesh: {
    sqft: { rate: 1, name: 'Square Feet' },
    sqm: { rate: 10.7639, name: 'Square Meter' },
    sqyd: { rate: 9, name: 'Square Yard' },
    bigha: { rate: 12000, name: 'Bigha (MP)' },
    katha: { rate: 600, name: 'Katha (MP)' },
    acre: { rate: 43560, name: 'Acre' },
    hectare: { rate: 107639, name: 'Hectare' }
  }
}

const stateOptions = [
  { value: 'standard', label: 'Standard Units (All India)' },
  { value: 'north', label: 'North India (Punjab, Haryana, Himachal Pradesh, J&K)' },
  { value: 'up', label: 'Uttar Pradesh' },
  { value: 'uttarakhand_plains', label: 'Uttarakhand - Plains (Haridwar, Dehradun)' },
  { value: 'uttarakhand_hills', label: 'Uttarakhand - Hills (Almora, Tehri, etc.)' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'bihar_jharkhand', label: 'Bihar & Jharkhand' },
  { value: 'west_bengal', label: 'West Bengal' },
  { value: 'assam', label: 'Assam' },
  { value: 'maharashtra', label: 'Maharashtra & Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'south', label: 'South India (Karnataka, Tamil Nadu, AP, Telangana, Kerala)' },
  { value: 'madhya_pradesh', label: 'Madhya Pradesh & Chhattisgarh' }
]

const infoData = [
  { region: 'Punjab/Haryana', info: '1 Bigha = 9,070 sq ft | 1 Kanal = 5,445 sq ft | 1 Marla = 272.25 sq ft' },
  { region: 'Uttar Pradesh', info: '1 Bigha = 27,225 sq ft | 1 Biswa = 1,361.25 sq ft | 1 Biswansi = 68.06 sq ft' },
  { region: 'Uttarakhand Plains', info: '1 Bigha = 27,000 sq ft | 1 Biswa = 1,350 sq ft (Haridwar, Dehradun)' },
  { region: 'Uttarakhand Hills', info: '1 Bigha = 43,200 sq ft | 1 Nali = 2,160 sq ft (Almora, Tehri, etc.)' },
  { region: 'West Bengal', info: '1 Bigha = 14,400 sq ft | 1 Katha = 720 sq ft | 1 Cottah = 720 sq ft' },
  { region: 'Bihar/Jharkhand', info: '1 Bigha = 27,225 sq ft | 1 Katha = 1,361.25 sq ft | 1 Dhur = 68.06 sq ft' },
  { region: 'South India', info: '1 Cent = 435.6 sq ft | 1 Ground = 2,400 sq ft | 1 Guntha = 1,089 sq ft' },
  { region: 'Maharashtra', info: '1 Guntha = 1,089 sq ft | 1 Acre = 40 Gunthas | 1 Bigha = 12,000 sq ft' },
  { region: 'Gujarat', info: '1 Bigha/Vigha = 17,424 sq ft | 1 Acre = 43,560 sq ft' },
  { region: 'Assam', info: '1 Bigha = 14,400 sq ft | 1 Katha = 2,880 sq ft | 1 Lecha = 144 sq ft' }
]

function App() {
  const [stateGroup, setStateGroup] = useState('standard')
  const [inputValue, setInputValue] = useState('1')
  const [inputUnit, setInputUnit] = useState('sqft')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const currentUnits = regionalUnits[stateGroup] || regionalUnits.standard

  useEffect(() => {
    if (currentUnits[inputUnit]) {
      convert()
    } else {
      const firstUnit = Object.keys(currentUnits)[0]
      setInputUnit(firstUnit)
    }
  }, [stateGroup])

  const convert = () => {
    const value = parseFloat(inputValue)
    
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid positive number')
      setResults([])
      return
    }

    setError('')
    const sqftValue = value * currentUnits[inputUnit].rate
    const convertedResults = []

    for (const [unit, data] of Object.entries(currentUnits)) {
      if (unit !== inputUnit) {
        const convertedValue = sqftValue / data.rate
        convertedResults.push({
          unit,
          name: data.name,
          value: convertedValue
        })
      }
    }

    setResults(convertedResults)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      convert()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-600 p-5">
      <div className="max-w-6xl mx-auto">
        <header className="text-center text-white mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2.5 drop-shadow-lg">
            🏡 Land Area Converter
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Convert between Indian land measurement units
          </p>
        </header>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="md:col-span-3 flex flex-col">
              <label htmlFor="stateGroup" className="font-semibold mb-2 text-gray-800 text-sm">
                Select State/Region
              </label>
              <select
                id="stateGroup"
                value={stateGroup}
                onChange={(e) => setStateGroup(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary-500 transition-colors"
              >
                {stateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="inputValue" className="font-semibold mb-2 text-gray-800 text-sm">
                Enter Area Value
              </label>
              <input
                type="number"
                id="inputValue"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter value"
                step="any"
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="inputUnit" className="font-semibold mb-2 text-gray-800 text-sm">
                From Unit
              </label>
              <select
                id="inputUnit"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary-500 transition-colors"
              >
                {Object.entries(currentUnits).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white border-none px-8 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            Convert Area
          </button>

          {error && (
            <p className="text-red-500 text-center mt-6 col-span-full">{error}</p>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
              {results.map((result) => (
                <div
                  key={result.unit}
                  className="bg-gradient-to-br from-gray-50 to-gray-200 p-5 rounded-xl text-center transition-transform hover:-translate-y-1"
                >
                  <div className="text-xs text-gray-600 mb-2 uppercase tracking-wider">
                    {result.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {result.value.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-xl text-gray-800 mb-4 font-semibold">
              Regional Land Measurements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infoData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600"
                >
                  <strong className="text-primary-500">{item.region}:</strong>{' '}
                  {item.info}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
