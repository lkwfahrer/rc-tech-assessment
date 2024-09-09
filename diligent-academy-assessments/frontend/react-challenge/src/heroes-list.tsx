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
    if (error) return <p>{error}</p>;

    return (
        <ul style={{listStyleType: 'none', paddingLeft: 0}}>
            {items.map((items: Hero) => (
                <li key={items.id}>
                    {items.id}. {items.name} {items.available ? items.available : null}
                </li>
            ))}

        </ul>
    );
}

function HeroesList() {
    return (
        <>
            <h2>Heroes</h2>
            <List/>
        </>
    );
}

export default HeroesList;
