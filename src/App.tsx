import {createContext, useEffect, useState} from "react";
import Card from "./components/Card.tsx";

type flippedCardsContextType = {
    flippedCards: number[],
    foundCards: number[],
    addCard: (c: number) => void,
    clearFlippedCards: () => void
}

export const flippedCardsContext = createContext<flippedCardsContextType>({
    flippedCards: [],
    foundCards: [],
    addCard: () => {},
    clearFlippedCards: () => {}
})

const App = () => {

    const [cards, setCards] = useState<string[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [foundCards, setFoundCards] = useState<number[]>([]);

    const [time, setTime] = useState<number>(0);
    const [startTime] = useState<number>(Date.now());

    useEffect(() => {
        const emojis = ["👍","😊","❤️","🎶","🚦","🚀","🌵","🚓"];
        setCards([...emojis, ...emojis].sort((a, b) => Math.floor(Math.random() * 3) - 1));
    }, [])

    useEffect(() => {
        if (flippedCards.length == 2) {
            if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
                setFoundCards(prev => [...prev, ...flippedCards]);
            }
            setTimeout(() => {
                setFlippedCards([]);
            }, 500)
        }
    }, [flippedCards]);

    useEffect(() => {
        const interval = setInterval(() => {
            // no one knows why this doesn't work, but this is react after all
            if (cards.length !== foundCards.length || time === 0) {
                const now = Date.now();
                const elapsedSeconds = Math.floor((now - startTime) / 1000);
                setTime(elapsedSeconds);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <flippedCardsContext.Provider value={{
            addCard: (c: number) => {setFlippedCards(prev => [...prev, c])},
            flippedCards: flippedCards,
            clearFlippedCards: () => setFlippedCards([]),
            foundCards: foundCards
        }}>
            <div className="cardWrapper">{cards.map((e, idx) => <Card symbol={e} idx={idx}/>)}</div>
        <div>{time}</div>
        </flippedCardsContext.Provider>
    )
}

export default App