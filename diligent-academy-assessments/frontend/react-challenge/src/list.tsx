import React from "react";
import { Hero } from "./useFetchHeroes";
import useFetchHeroes from "./useFetchHeroes";

const List = () => {
    const { items, loading, error, setItems } = useFetchHeroes();

    if (loading) return <p>Loading</p>;
    if (error) return <p>Failed to fetch heroes</p>;

    const handleClick = (index: number) => {
        setItems((prevItems: Hero[]) =>
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