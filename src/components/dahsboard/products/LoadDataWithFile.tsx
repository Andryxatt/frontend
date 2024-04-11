import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import axios from "axios";
const LoadDataWithFile: React.FC = () => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
            try {
                const formData = new FormData();
                if (file) {
                    formData.append('file', file);
                }
                const response = await axios.post(`${import.meta.env.VITE_API_URL}products/upload-excel `, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File uploaded:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
    };
    const handleFileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        try {
            const formData = new FormData();
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}products/upload-image `, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
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
         
        </DashboardLayout>
    )
}
export default LoadDataWithFile