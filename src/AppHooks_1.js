import React, { useState, useEffect } from "react";

export default function App() {
    const [repositores, setRepositores] = useState([])

    useEffect(async () => {
        const response = await fetch("https://api.github.com/users/Jonatan0509/repos")
        const data = await response.json()

        setRepositores(data)
    }, []);

    useEffect(() => {
        const filtered = repositores.filter(repo => repo.favorite);

        document.title = `Você tem ${filtered.length} favoritos`;
    }, [repositores])

    function handleFavorite(id) {
        const newRepositores = repositores.map(repo => {
            return repo.id == id ? { ...repo, favorite: !repo.favorite } : repo
        });

        setRepositores(newRepositores);
    }

    return (
        <ul>
            {repositores.map(repo => (
                <li key={repo.id}>
                    {repo.name}
                    {repo.favorite && <span>(Favorito) </span>}
                    <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
                </li>
            ))}
        </ul>
    )
} 