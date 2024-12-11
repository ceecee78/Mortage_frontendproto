import React, { useState } from 'react';

function SearchForm() {
  const [filters, setFilters] = useState({
    msamd: '', //done 
    county: '', //done
    loantype: '', 
    loanPurpose: '',
    propertyType: '',
    maxIncometoDebtratio: '',
    minIncometoDebtratio: '',
    mintracttomsamd:'',
    maxtracttomsamd:''

  });

  const loantypes = ['FHA-insured', 'VA-guranteed', 'FSA/RHS-guranteed', 'Conventional'];
  const county = ['Camden County', 'Cape May County', 'Monmouth County','Bergen County','Ocean County','Union County','Somerset County','Essex County','Burlington County','Gloucester County','Middlesex County', 'Mercer County','Morris County','Atlantic County','Sussex County','Passaic County','Warren County','Hudson County','Salem County','Hunterdon County','Cumberland County'];
  const loanPurposes = ['Home purchase', 'Home improvement', 'Refinancing'];
  const propertyTypes = ['One-to-four family', 'Manufactured housing', 'Multifamily'];
  const msamd = ['Camden - NJ','Ocean City - NJ','New York, Jersey City, White Plains - NY, NJ','Newark - NJ, PA','Atlantic City, Hammonton - NJ','Trenton - NJ','Vineland, Bridgeton - NJ','Allentown, Bethlehem, Easton - PA, NJ']

  const [searchResults, setSearchResults] = useState([]);
  const [selectedMortgages, setSelectedMortgages] = useState([]); //still wworking on understanding this part
  const [calculatedRate, setCalculatedRate] = useState(null);
  const [packageResult, setPackageResult] = useState('');

  

  const handleChange = (e) => {
    const { name, value } = e.target;  
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {  //working on understanding this part too
    e.preventDefault(); 
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/api/mortgages/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters)
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching mortgages:', error);
    }
  };


  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="msamd">MSAMD:</label>
          <select
            id="msamd"
            name = "msamd"
            value={filters.msamd}
            onChange={handleChange}
          >
          <option value="">Select MSAMD</option>
            {msamd.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="county">County:</label>
          <select
            id="county"
            name="county"
            value={filters.county}
            onChange={handleChange}
          >
          <option value="">Select County</option>
            {county.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="loantype">Loan Type:</label>
          <select
            id="loantype"
            name = "loantype"
            value={filters.loantype}
            onChange={handleChange}
            >
            <option value="">Select Loan Type</option>
              {loantypes.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
              </select>
          </div>

        <div className="form-group">
          <label htmlFor="loanPurpose">Loan Purpose:</label>
          <select
            id="loanPurpose"
            name = "loanPurpose"
            value={filters.loanPurpose}
            onChange={handleChange}
            >
            <option value="">Select Loan Purpose</option>
              {loanPurposes.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
              </select>
          </div>

        <div className="form-group">
          <label htmlFor="propertyType">Property Type:</label>
          <select
            type="text"
            id="propertyType"
            name = "propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            >
            <option value="">Select Property Type</option>
              {propertyTypes.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
              </select>
          </div>

        <div className="form-group">
          <label>Income to debt ratio:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="minIncometoDebtratio"
              value={filters.minIncometoDebtratio}
              onChange={handleChange}
              placeholder="Minimum"
            />
            <input
              type="number"
              name="maxIncometoDebtratio"
              value={filters.maxIncometoDebtratio}
              onChange={handleChange}
              placeholder="Maximum"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tract to msamd income:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="mintracttomsamd"
              value={filters.mintracttomsamd}
              onChange={handleChange}
              placeholder="Minimum"
            />
            <input
              type="number"
              name="maxtracttomsamd"
              value={filters.maxtracttomsamd}
              onChange={handleChange}
              placeholder="Maximum"
            />
          </div>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>

    
  );
}

export default SearchForm;

