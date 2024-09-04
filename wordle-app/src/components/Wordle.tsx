"use client";

import React, { useState, useEffect } from 'react';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const Wordle = () => {
    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setWord('REACT');
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (gameOver) return;

        if (event.key === 'Enter' && currentGuess.length === WORD_LENGTH) {
            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            setCurrentGuess('');

            if (currentGuess === word || newGuesses.length === MAX_GUESSES) {
                setGameOver(true);
            }
        } else if (event.key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (currentGuess.length < WORD_LENGTH && event.key.match(/^[a-zA-Z]$/)) {
            setCurrentGuess(prev => prev + event.key.toUpperCase());
        }
    };

    const getLetterClass = (letter: string, index: number, guess: string) => {
        if (letter === word[index]) {
            return 'bg-green-500';
        } else if (word.includes(letter)) {
            return 'bg-yellow-500';
        } else {
            return 'bg-gray-500';
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-4">
                {guesses.map((guess, i) => (
                    <div key={i} className="flex justify-center mb-2">
                        {guess.split('').map((letter, j) => (
                            <div
                                key={j}
                                className={`w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-white ${getLetterClass(letter, j, guess)}`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mb-4 text-black">
                {currentGuess.split('').map((letter, i) => (
                    <div
                        key={i}
                        className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold"
                    >
                        {letter}
                    </div>
                ))}
                {Array(WORD_LENGTH - currentGuess.length).fill(null).map((_, i) => (
                    <div
                        key={i}
                        className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center"
                    ></div>
                ))}
            </div>
            <input
                type="text"
                value={currentGuess}
                onKeyDown={handleKeyDown}
                maxLength={WORD_LENGTH}
                className="w-full p-2 text-center text-xl text-black border-2 border-gray-300 rounded"
                disabled={gameOver}
            />
            {gameOver && (
                <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-black">
                        {guesses[guesses.length - 1] === word ? 'Congratulations!' : 'Game Over!'}
                    </p>
                    <p className="mt-2 text-black">The word was: </p>
                    <p className="mt-2 text-blue-500">{word}</p>
                </div>
            )}
        </div>
    );
};

export default Wordle;