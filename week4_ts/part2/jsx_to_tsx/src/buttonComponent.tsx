import React, { useEffect, useState } from "react";

interface ButtonProps {
    initialCount: number;
    changeFactor: number;
}

const ButtonComponent: React.FC<ButtonProps> = ({ initialCount, changeFactor }):JSX.Element => {
    const storedCount: string | null = localStorage.getItem("count");
    const defaultCount: number = storedCount ? JSON.parse(storedCount) : 0;
    const [count, setCount] = useState<number>(defaultCount);

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        const storedCount: string |null = localStorage.getItem("count");
        const items:number = storedCount ? JSON.parse(storedCount) : 0;
        if (items) {
            setCount(items);
        } else {
            setCount(initialCount);
        }
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + changeFactor)}>Increase</button>
            <button onClick={() => setCount(count - changeFactor)}>Decrease</button>
            <p>count is {count}</p>
        </div>
    );
};

export default ButtonComponent;
