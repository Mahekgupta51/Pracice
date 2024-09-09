import { useCallback, useState } from "react";
import data from './data';
import './styles.css';

export default function Accordian() {
    const [selected, setSelected] = useState([]);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);

    const handleClick = useCallback((id) => {
        if (enableMultiSelection) {
            setSelected((prevSelected) => prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id]);
        } else {
            setSelected((prevSelected) => prevSelected.includes(id) ? []:[id])
        }
    }, [enableMultiSelection]);

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection((prev) => !prev)}>
                ENABLE MULTI SELECTION
            </button>
            <div className="accordian">
                {data && data?.length > 0 ? (
                    data?.map((item) => (
                        <div className="item" key={item?.id}>
                            <div className="title" onClick={() => handleClick(item?.id)}>
                                <h3>{item?.question}</h3>
                                <span> + </span>
                            </div>
                            {selected?.includes(item?.id) && (
                                <div className="content">{item?.answer}</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No data found !</div>
                )}
            </div>
        </div>
    );
}