function DataDropdown({ onSelectData }) {
    return (
      <select className="py-1 px-2 rounded-md bg-shopeasy-blue" onChange={(e) => onSelectData(e.target.value)}>
        <option value="data1">{"Trader Joe's"}</option>
        <option value="data2">Hannaford</option>
      </select>
    );
  }
export default DataDropdown;