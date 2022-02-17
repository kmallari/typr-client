import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Words } from "../components/Words";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../components/Input";

const Home: NextPage = () => {
  const [TwoDWords, setTwoDWords] = useState<string[][]>([]);
  const [words, setWords] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currLetter, setCurrLetter] = useState<string>("");
  const [currWord, setCurrWord] = useState<string[]>([]);
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);
  const [stringInput, setStringInput] = useState<string>("");
  const [fiftyCount, setFiftyCount] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const splitTo2DArr = (input: string[]): string[][] => {
    // CONVERTS THE JSON ARRAY TO AN ARRAY OF LETTERS
    const words: string[][] = input.map((word: string) => {
      return word.split("");
    });

    // CONVERTS THE ARRAY OF WORDS TO AN ARRAY OF LETTERS
    // MAKES A 2D ARRAY OF LETTERS AND ADDS A SPACE BETWEEN EACH WORD
    const letters: string[][] = words.map((word: string[]) => {
      return word.map((letter: string) => {
        return letter + " ";
      });
    });

    // // JOINS THE ARRAY OF LETTERS TOGETHER
    // const joinedWords: string[][] = [];

    // for (let i = 0; i < letters.length * 2; i++) {
    //   if (i % 2 === 0) {
    //     joinedWords.push(letters[i / 2]);
    //   } else {
    //     joinedWords.push([" "]);
    //   }
    // }

    // console.log("LETTERS!", letters);

    return letters;
  };

  const splitToLetters = (input: string[]): string[] => {
    // CONVERTS THE JSON ARRAY TO AN ARRAY OF LETTERS
    // AND SPLIT EACH WORD WITH A SPACE

    let letters: string[] = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        letters.push(input[i][j]);
      }
      if (i != input.length - 1) {
        letters.push(" ");
      }
    }

    return letters;
  };

  const getFifty = (arr: string[][]): string[][] => {
    const start: number = 50 * fiftyCount;
    const end: number = start + 50;
    const a: string[][] = [];

    for (let i = start; i < end; i++) {
      a.push(arr[i]);
    }

    setFiftyCount((old) => old + 1);

    return a;
  };

  // COUNT HOW MANY SPACES IN A STRING
  const countSpaces = (str: string): number => {
    let count: number = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        count++;
      }
    }
    return count;
  };

  // FETCH DATA FROM https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords"
      );
      const json: string[] = await response.json();
      setTwoDWords(splitTo2DArr(json));
      setWords(getFifty(splitTo2DArr(json)));
      setCurrWord(getFifty(splitTo2DArr(json))[0]);
      // setPureLetters(splitToLetters(json));
      // setCurrLetter(pureLetters[0]);

      console.log("currLetter", currLetter);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  // DETECTS KEYDOWN EVENT AND SETS currentLetterInput TO THE LETTER PRESSED
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setStringInput(e.currentTarget.value);

    const currString: string = e.currentTarget.value;

    // IDEA: IF LAST INPUT OF INPUT IS SPACE, CLEAR INPUT AND MOVE WORD INDEX

    setCurrWordIndex(e.currentTarget.value.length - countSpaces(currString));
  };

  // FETCH DATA WHEN COMPONENTS MOUNTS
  useEffect(() => {
    fetchData();
    inputRef.current?.focus();

    // ADD EVENT LISTENER FOR THE KEYDOWN EVENT
    // document.addEventListener("keydown", onChangeHandler);
  }, []);

  return (
    <div className='m-0 bg-slate-800 h-screen w-full'>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        {stringInput}

        <div
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Words
            words={words}
            loading={loading}
            error={error}
            currentWordIndex={currWordIndex}
            inputRef={inputRef}
            onChangeHandler={onChangeHandler}
          />
        </div>
        <Input onChangeHandler={onChangeHandler} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default Home;
