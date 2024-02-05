import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const useExcelLoader = (filePath: string) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(filePath);
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                console.log(workbook);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setData(jsonData);
            } catch (error) {
                console.error('Error loading Excel file:', error);
            }
        };

        fetchData();
    }, [filePath]);

    return data;
};

export default useExcelLoader;
