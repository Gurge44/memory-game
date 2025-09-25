import {useContext} from "react";
import {flippedCardsContext} from "../App.tsx";

const Card = (props: {symbol: string, idx: number}) => {

    const {addCard, flippedCards, foundCards} = useContext(flippedCardsContext)
    let flipped = flippedCards.includes(props.idx) || foundCards.includes(props.idx);

    const flipCard = () => {
        if (flippedCards.length < 2 && !flipped) {
            addCard(props.idx);
        }
    }

    return (
        <>
            <div className={flipped ? "card" : "card faceDown"} onClick={flipCard}>
                <div className="front">{props.symbol}</div>
                <div className="back"></div>
            </div>
        </>
    );
};

export default Card;