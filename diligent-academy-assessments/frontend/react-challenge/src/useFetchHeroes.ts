import { useEffect, useState } from "react";
import { callApi } from "./call-api";

export interface Hero {
    id: number;
    name: string;
    available: boolean;
}

const useFetchHeroes = () => {
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

    return { items, loading, error, setItems };
}

export default useFetchHeroes;