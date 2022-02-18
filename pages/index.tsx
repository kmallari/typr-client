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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeWord, setActiveWord] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  const [fiftyCount, setFiftyCount] = useState<number>(0);
  const [finishedWords, setFinishedWords] = useState<string[]>([]);
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
        return letter + "";
      });
    });
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

  const arrToStr = (str: string[]) => {
    let s: string = "";
    for (let i in str) {
      s += str[i];
    }
    return s;
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

  // FETCH DATA FROM https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords"
      );
      const json: string[] = await response.json();
      setTwoDWords(splitTo2DArr(json));
      setWords(getFifty(splitTo2DArr(json)));
      setActiveWord(getFifty(splitTo2DArr(json))[0]);

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  // GENERATE AN ARRAY OF UNIQUE RANDOM INTEGERS
  const generateRandom = (length: number): number[] => {
    let arr: number[] = [];
    while (arr.length < length) {
      let random = Math.floor(Math.random() * length);
      if (arr.indexOf(random) === -1) arr.push(random);
    }
    return arr;
  };
  

  // DETECTS KEYDOWN EVENT AND SETS currentLetterInput TO THE LETTER PRESSED
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const word = e.currentTarget.value;
    const activeWordString = arrToStr(activeWord);
    setInput(word.split(""));

    // console.log("word", word);
    // console.log("activeWordString", activeWordString);
    // console.log(finishedWords);

    // TO DO:
    // ADD EXTRA LETTERS WHEN TYPING AFTER THE WORD
    // MOVE WORDS UP

    if (word === activeWordString + " ") {
      const idx = activeIndex + 1;
      setFinishedWords((fw) => [...fw, arrToStr(activeWord)]);
      setActiveIndex((idx) => idx + 1);
      setActiveWord(words[idx]);
      setInput([]);
      e.currentTarget.value = "";
    }
  };

  // FETCH DATA WHEN COMPONENTS MOUNTS
  useEffect(() => {
    fetchData();
    inputRef.current?.focus();
  }, []);

  return (
    <div className='m-0 bg-slate-800 h-screen w-full'>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Words
            words={words}
            loading={loading}
            error={error}
            inputRef={inputRef}
            onChangeHandler={onChangeHandler}
            activeWord={activeWord}
            input={input}
            arrToStr={arrToStr}
            finishedWords={finishedWords}
          />
        </div>
        <Input onChangeHandler={onChangeHandler} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default Home;
