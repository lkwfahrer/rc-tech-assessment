import React, { useState, useEffect} from "react";
import {callApi} from "./call-api";

interface Hero {
    id: number;
    name: string;
    available: boolean;
}

const List = () => {
    const [items, setItems] = useState<Hero[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getItems = async () => {
            try {
                const heroes: Hero[] = await callApi("heroes");
                setItems(heroes)
            }
            catch (e) {
                setError("Fetching failed");
            } finally {
                setLoading(false);
            }
        }

        getItems();
    }, []);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Failed to fetch heroes</p>;

    const handleClick = (index: number) => {
        setItems(prevItems =>
            prevItems.map((item, idx) =>
                idx === (index-1) ? { ...item, available: !item.available } : item
            )
        );
    }

    return (
        <ul style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            listStyleType: 'none',
            paddingLeft: 0}}
        >
            {items.map((items: Hero) => (
                <li
                    key={items.id}
                    onClick={() => handleClick(items.id)}
                    style={{color: items.available ? 'green' : 'red',flex: '0 0 33.33%'}}
                >
                    {items.id}. {items.name} {items.available ? '"Available"' : null}
                </li>
            ))}

        </ul>
    );
}

export {List}