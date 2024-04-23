function DataDropdown({ onSelectData }) {
    return (
      <select className="py-2 px-4 rounded-md bg-shopeasy-blue text-white" onChange={(e) => onSelectData(e.target.value)}>
        <option value="data1">{"Trader Joe's"}</option>
        <option value="data2">Hannaford</option>
        <option value="data3">Fresh Meals</option>
      </select>
    );
  }
export default DataDropdown;