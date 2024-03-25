import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "./SlideShow.sass"
const SlideShow = ({ images }: any) => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(images[0].id);
    const changeImage = (image: any, index: number) => {
        setCurrentImage(image);
        setCurrentImageIndex(index);
    }
    const nextImage = () => {
        console.log(currentImageIndex);
        if (currentImageIndex === images.length - 1) {
            setCurrentImage(images[0]);
            setCurrentImageIndex(0);
            return;
        }
        else {
            setCurrentImage(images[currentImageIndex + 1]);
            setCurrentImageIndex(currentImageIndex + 1);
        }

    }
    const prevImage = () => {
        if (currentImageIndex === 0) {
            setCurrentImage(images[images.length - 1]);
            setCurrentImageIndex(images.length - 1);
            return;
        }
        else {
            setCurrentImage(images[currentImageIndex - 1]);
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }
    useEffect(() => {
        setCurrentImage(images[0]);
        setCurrentImageIndex(0);
    }, [images]);
   
    return (
        <div className="flex md:flex-row sm:flex-col">
            <div className="md:flex md:flex-col mr-4 hidden">
                {images?.map((image: any, index: number) => (
                    <div className={`${currentImageIndex === index ? "border-black" : "transition-border duration-300 border-b-[1px] border-transparent"}  mb-2 border-b-[1px]`} key={index}>
                        <img onMouseOver={() => changeImage(image, index)} className="w-[5em] transition-opacity duration-300 hover:opacity-75" src={`${import.meta.env.VITE_FILE_URL}${image.imagePath}`} alt="Sunset in the mountains" />
                    </div>
                ))}
            </div>
            <div className="relative">
                <img
                 src={`${import.meta.env.VITE_FILE_URL}${currentImage.imagePath}`} 
                 alt="Sunset in the mountains"
                 className="imgAnimation"
                 />
                <IconContext.Provider value={{ size: '40px' }}>
                    <button className="absolute hover:bg-opacity-90 right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-gray-400 bg-opacity-30" onClick={prevImage}><FaChevronRight /></button>
                    <button className="absolute hover:bg-opacity-90 left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg-gray-400 bg-opacity-30" onClick={nextImage}><FaChevronLeft /></button>
                </IconContext.Provider>
            </div>
        </div>
    )
};
export default SlideShow;