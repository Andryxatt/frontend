import { useState } from "react";
import useExcelLoader from "../../../customHooks/useExcelLoader";
import DashboardLayout from "../../../layouts/DashboardLayout";

const LoadDataWithFile: React.FC = () => {
    const [filePath, setFilePath] = useState<string | null>(null);
    // const [fileImage, setFileImage] = useState<FileList | null>(null);
    const excelData = useExcelLoader(filePath || ''); // Pass an empty string if filePath is null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFilePath(URL.createObjectURL(file));
        }
    };
    const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log(files);
        }
    };
    
    return (
        <DashboardLayout>
            <label htmlFor="fileInput" className="bg-slate-600 mr-2 text-white p-2 rounded-md cursor-pointer">
                Оберіть excel файл
            </label>
            <input
                id="fileInput"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="imagesInput" className="bg-slate-600 mr-2 text-white p-2 rounded-md cursor-pointer">
                Завантажте фото
            </label>
            <input
                id="imagesInput"
                type="file"
                multiple
                onChange={handleFileImageChange}
                style={{ display: 'none' }}
            />
            {excelData.length > 0 && (
                <div>
                    <h2>Data from Excel:</h2>
                    <pre>{JSON.stringify(excelData, null, 2)}</pre>
                </div>
            )}
        </DashboardLayout>
    )
}
export default LoadDataWithFile