import { useState, useEffect, useCallback } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async (getUrl) => {
        try {
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response?.json();
            setImages(data);
            setLoading(false);
        } catch (e) {
            setErrorMsg(e?.message);
            setLoading(false);
        }
    }, [page, limit]);

    const handlePrevious = useCallback(() => {
        setCurrentSlide((currentSlide - 1 + images?.length) % images?.length);
    }, [currentSlide, images]);

    const handleNext = useCallback(() => {
        setCurrentSlide((currentSlide + 1) % images?.length);
    }, [currentSlide, images]);

    useEffect(() => {
        if (url !== "") fetchImages(url);
    }, [url]);

    if (loading) return <div>Loading data ! Please wait</div>;
    if (errorMsg !== null) return <div>Error occured ! {errorMsg}</div>;

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
            {images?.map((imageItem, index) => (
                <img
                    key={imageItem?.id}
                    alt={imageItem?.download_url}
                    src={imageItem?.download_url}
                    className={currentSlide === index ? "current-image" : "hide-current-image"}
                />
            ))}
            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
            <span className="circle-indicators">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        className={currentSlide === index ? "current-indicator" : "inactive-indicator"}
                        onClick={() => setCurrentSlide(index)}
                    ></button>
                ))}
            </span>
        </div>
    );
}