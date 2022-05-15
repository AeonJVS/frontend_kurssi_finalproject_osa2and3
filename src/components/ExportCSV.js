import React from 'react';
import { CSVLink } from "react-csv";

const ExportCSV = ({ infoTrainings, infoCustomers }) => {

    const data = infoCustomers;

    const csvReport = {
        data: data,
        filename: 'exported_data.csv'
    };

    return (
        <div>
            <h2>
                <CSVLink {...csvReport}>Export as CSV</CSVLink>
            </h2>
        </div>
    );
}

export default ExportCSV;