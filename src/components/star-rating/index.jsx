import { useCallback, useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa'

import './styles.css'

export default function StarRating({ numberOfStarts }) {
    const starArray = [...Array(numberOfStarts)]
    const [starRating, setStarRating] = useState(0)
    const [hover, setHover] = useState(0)


    const handleClick = useCallback((getCurrentId) => {
        setStarRating(getCurrentId)
    }, [])

    const handleMouseEnter = useCallback((getCurrentId) => {
        setHover(getCurrentId)
    }, [])

    const handleMouseLeave = useCallback((getCurrentId) => {
        setHover(starRating)
    }, [])

    return (
        <div className="star-rating">
            {starArray?.map((item, index) => (
                <FaStar
                    key={index}
                    className={index <= (hover || starRating) ? "active" : "inactive"}
                    onClick={() => handleClick(index)}
                    onMouseMove={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    size={40}
                />
            ))
            }
        </div>
    )
}
