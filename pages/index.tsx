import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Words } from "../components/Words";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../components/Input";

const Home: NextPage = () => {
  const [TwoDWords, setTwoDWords] = useState<string[][]>([]);
  const [pureLetters, setPureLetters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currLetter, setCurrLetter] = useState<string>("");
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);
  const [stringInput, setStringInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  let l = 0;
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

    // JOINS THE ARRAY OF LETTERS TOGETHER
    const joinedWords: string[][] = [];

    for (let i = 0; i < letters.length * 2; i++) {
      if (i % 2 === 0) {
        joinedWords.push(letters[i / 2]);
      } else {
        joinedWords.push([" "]);
      }
    }

    // console.log("JOINED!", joinedWords);

    return joinedWords;
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

  // FETCH DATA FROM https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords"
      );
      const json: string[] = await response.json();
      await setTwoDWords(splitTo2DArr(json));
      await setPureLetters(splitToLetters(json));
      await setCurrLetter(pureLetters[0]);

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
    // setStringInput(e.currentTarget.value);
    // setCurrWordIndex((e.currentTarget.value.length));
    // l = e.currentTarget.value.length;
    // console.log(l);
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
            words={TwoDWords}
            loading={loading}
            error={error}
            currentWordIndex={l}
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
