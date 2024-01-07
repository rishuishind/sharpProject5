// CSVExport.js
import Papa from 'papaparse';

const convertToCSV = (data) => {
    const csv = Papa.unparse(data);
    return csv;
};

export default convertToCSV;
