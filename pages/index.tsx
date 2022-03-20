import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { Words } from "../components/Words";
import { Input } from "../components/Input";
import { Caret } from "../components/Caret";
import { Timer } from "../components/Timer";
import { TimerOptions } from "../components/TimerOptions";
import { Statistics } from "../components/Statistics";
import { Error } from "../components/Error";
import { Navbar } from "../components/Navbar";
import fetch_words from "./api/fetch_words";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { checkServerIdentity } from "tls";
import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  // const id = context.params.id;
  // const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  // const data = await res.json();

  // return {
  //   props: { ninja: data },
  // };

  const res = await fetch(
    "https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords"
  );
  const data: string[] = await res.json();

  return {
    props: { fetchedWords: data },
  };
};

const Home: NextPage = () => {
  const [allWords, setAllWords] = useState<string[][]>([]);
  const [words, setWords] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeWord, setActiveWord] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  // const [fiftyCount, setFiftyCount] = useState<number>(0);
  const [finishedWords, setFinishedWords] = useState<string[]>([]);
  const [charsPerRow, setCharsPerRow] = useState<number>(61);
  const [lastWordPerRow, setLastWordPerRow] = useState<string[][]>([]);
  const [typedWords, setTypedWords] = useState<number>(0);
  const [typedLetters, setTypedLetters] = useState<number>(0);
  const [typedCharsPerRow, setTypedCharsPerRow] = useState<number>(0);
  const [charsPerLine, setCharsPerLine] = useState<number>(0);
  const [isCaretMiddle, setIsCaretMiddle] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);
  const [constTimer, setConstTimer] = useState<number>(30);
  const [widthError, setWidthError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { height, width } = useWindowDimensions();

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

  // CONVERTS ARRAY TO STRING
  const arrToStr = (str: string[]) => {
    let s: string = "";
    for (let i in str) {
      s += str[i];
    }
    return s;
  };

  // GET 140 WORDS
  const getOneForty = (arr: string[][]): string[][] => {
    // const start: number = 50 * fiftyCount;
    const end: number = 140;
    const a: string[][] = [];

    for (let i = 0; i < end; i++) {
      a.push(arr[i]);
    }

    // setFiftyCount((old) => old + 1);

    return a;
  };

  // FETCH DATA FROM https://whj2et0lze.execute-api.ap-southeast-1.amazonaws.com/getWords
  const fetchData = async () => {
    fetch(
      "https://whj2et0lze.execute-api.ap-southeast-1.amazonaws.com/words/get-words",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAllWords(splitTo2DArr(data));
        setWords(getOneForty(splitTo2DArr(data)));
        setActiveWord(getOneForty(splitTo2DArr(data))[0]);

        setLoading(false);
      })
      .catch(() => setError(true));
  };

  const typeAgainHandler = () => {
    setTimer(constTimer);
    setTypedCharsPerRow(0);
    setCharsPerLine(0);
    setActiveIndex(0);
    setFinishedWords([]);
    setCharsPerLine(0);
    setActiveWord(words[activeIndex]);
    if (inputRef.current?.value != null) {
      inputRef.current.value = "";
    }
    inputRef.current?.focus();

    setTypedWords(0);
  };

  // DETECTS KEYDOWN EVENT AND SETS currentLetterInput TO THE LETTER PRESSED
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const word = e.currentTarget.value;

    if (word.length > 0 && started === false && timer != 0) {
      setStarted(true);
    }

    const activeWordString = arrToStr(activeWord);
    setCharsPerLine(typedCharsPerRow + word.length);

    setInput(word.split(""));

    if (word === activeWordString + " " && started && timer != 0) {
      const typed = typedWords;
      const idx = activeIndex + 1;
      setFinishedWords((fw) => [...fw, arrToStr(activeWord)]);
      setActiveIndex((idx) => idx + 1);
      setActiveWord(words[idx]);
      setInput([]);
      setTypedWords(typed + 1);
      setTypedCharsPerRow((prev) => activeWordString.length + prev + 1);
      deleteTopRow(word.slice(0, -1));
      e.currentTarget.value = "";
    }
  };

  const splitToRows = (): void => {
    const rows: string[][][] = [];
    let row: string[][] = [];
    let sum: number = 0;

    // SPLITS THE WORDS PER ROW
    for (let i = 0; i < words.length; i++) {
      sum += words[i].length + 1;
      row.push(words[i]);
      if (sum - 1 >= charsPerRow) {
        row.pop();
        rows.push(row);
        row = [words[i]];
        sum = words[i].length + 1;
      }
    }

    const lastWords: string[][] = [];

    // GETS THE LAST WORD PER ROW
    for (let i = 0; i < rows.length; i++) {
      lastWords.push(rows[i][rows[i].length - 1]);
    }

    setLastWordPerRow(lastWords);
  };

  // DELETES THE FIRST ROW OF THE words ARRAY TO MAKE THE
  // WORDS MOVE UP IN THE DISPLAY
  const deleteTopRow = (w: string): void => {
    const tempWords: string[][] = words;
    const lastWords: string[] = [];

    for (let i = 0; i < lastWordPerRow.length; i++) {
      lastWords.push(lastWordPerRow[i].join(""));
    }

    let index: number = 0;
    if (lastWords.indexOf(w) === 0) {
      setTypedCharsPerRow(0);
      setCharsPerLine(0);
      setIsCaretMiddle(true);
    } else if (lastWords.indexOf(w) > 0) {
      while (true) {
        if (words[index].join("") === lastWords[lastWords.indexOf(w) - 1]) {
          index++;
          break;
        }
        index++;
      }
      setTypedCharsPerRow(0);
      setCharsPerLine(0);
    }

    for (let i = 0; i < index; i++) {
      tempWords.shift();
    }

    setWords(tempWords);
    setActiveIndex((idx) => idx - index);
  };

  // CHANGES THE NUMBER OF CHARACTERS PER ROW
  // DEPENDING ON THE WIDTH OF THE WINDOW
  // 1 CHAR => 14 PIXELS
  const calculateCharsPerRow = (): void => {
    let chars: number;
    if (width != null) {
      if (width > 440 && width <= 990) {
        chars = 28 + Math.floor((width - 440) / 16);
        setCharsPerRow(chars);
      } else if (width > 990) {
        setCharsPerRow(62);
      }
    }
  };

  useEffect(() => {
    if (timer != 0 && started) {
      setTimer(0);
      setStarted(false);
      setWidthError(true);
      setTimeout(() => {
        setWidthError(false);
      }, 2500);
    }
  }, [width]);

  // FETCH DATA WHEN COMPONENTS MOUNTS
  useEffect(() => {
    fetchData();
    inputRef.current?.focus();
    calculateCharsPerRow();
    splitToRows();
  }, []);

  useEffect(() => {
    calculateCharsPerRow();
    splitToRows();
  }, [started, words, width]);

  // useEffect(() => {
  //   calculateCharsPerRow();
  //   splitToRows();
  // }, [words]);

  useEffect(() => {
    let tempStarted = started;
    if (timer === 0) {
      tempStarted = false;
      let sum: number = 0;

      // COUNT NUMBER OF CHARACTERS TYPED
      for (let i = 0; i < typedWords; i++) {
        sum += allWords[i].length;
      }
      setTypedLetters(sum);

      // RESET THE STATES
      setIsCaretMiddle(false);
      inputRef.current?.focus();
      setActiveIndex(0);
      calculateCharsPerRow();
      splitToRows();
      setInput([]);
      setFinishedWords([]);
      setTypedCharsPerRow(0);
      fetchData();
    }
    setStarted(tempStarted);
  }, [timer]);

  return (
    <>
      <Head>
        <title>typr</title>
        <meta name='keywords' content='homepage' />
      </Head>
      <div className='m-0 bg-slate-800 h-screen w-full'>
        <div className='w-full h-screen flex flex-col items-center justify-center'>
          {started ? (
            <Timer started={started} timer={timer} setTimer={setTimer} />
          ) : null}
          {started ? null : (
            <TimerOptions
              setConstTimer={setConstTimer}
              timer={timer}
              setTimer={setTimer}
              constTimer={constTimer}
              setCharsPerLine={setCharsPerLine}
              setTypedCharsPerRow={setTypedCharsPerRow}
              inputRef={inputRef}
            />
          )}
          <div
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            {timer != 0 ? (
              <>
                <Words
                  words={words}
                  loading={loading}
                  error={error}
                  onChangeHandler={onChangeHandler}
                  activeWord={activeWord}
                  input={input}
                  arrToStr={arrToStr}
                  finishedWords={finishedWords}
                />
                <Caret
                  isCaretMiddle={isCaretMiddle}
                  charsPerLine={charsPerLine}
                  loading={loading}
                  error={error}
                />
              </>
            ) : (
              <Statistics
                constTimer={constTimer}
                typedWords={typedWords}
                typedLetters={typedLetters}
                typeAgainHandler={typeAgainHandler}
              />
            )}
          </div>
          <Input
            onChangeHandler={onChangeHandler}
            inputRef={inputRef}
            typedCharsPerRow={typedCharsPerRow}
            charsPerRow={charsPerRow}
            started={started}
            timer={timer}
          />
        </div>
        <Error widthError={widthError} />
      </div>
      <Navbar />
    </>
  );
};

export default Home;
