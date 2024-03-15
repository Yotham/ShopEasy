function DataDropdown({ onSelectData }) {
    return (
      <select
        className="p-2 rounded-md"
        onChange={(e) => onSelectData(e.target.value)}
      >
        <option value="data1">{"Trader Joe's"}</option>
        <option value="data2">Hannaford</option>
      </select>
    );
  }
export default DataDropdown;