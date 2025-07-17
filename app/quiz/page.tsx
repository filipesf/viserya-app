'use client';

import React, { use, useEffect, useState } from 'react';
import { AbilityScores, Button, Card } from '@viserya/ui';
import { getQuizQuestions } from '@viserya/utils/getRandomElement';
import { shuffle } from '@viserya/utils/shuffle';

type Attribute = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

interface Answer {
  attribute: Attribute;
  text: string;
}

interface Question {
  attribute: Attribute;
  category: 'Physical' | 'Mental';
  text: string;
  answers: Answer[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, Attribute[]>>({});
  const [results, setResults] = useState<Record<Attribute, number> | null>(
    null,
  );

  const [summary, setSummary] = useState<Record<string, string[]>>({});

  const handleAnswerSelect = (
    questionIndex: number,
    selectedAnswer: Attribute,
    choices: { q: string; a: string },
  ) => {
    setSummary((prevSummary) => {
      const currentSummary = prevSummary[choices.q] || [];
      if (currentSummary.includes(choices.a)) {
        return {
          ...prevSummary,
          [choices.q]: currentSummary.filter((ans) => ans !== choices.a),
        };
      } else if (currentSummary.length < 2) {
        return {
          ...prevSummary,
          [choices.q]: [...currentSummary, choices.a],
        };
      }
      return prevSummary;
    });

    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionIndex] || [];
      if (currentAnswers.includes(selectedAnswer)) {
        return {
          ...prevAnswers,
          [questionIndex]: currentAnswers.filter(
            (ans) => ans !== selectedAnswer,
          ),
        };
      } else if (currentAnswers.length < 2) {
        return {
          ...prevAnswers,
          [questionIndex]: [...currentAnswers, selectedAnswer],
        };
      }
      return prevAnswers;
    });
  };

  const getAttributeCategory = (attribute: Attribute) => {
    return ['STR', 'DEX', 'CON'].includes(attribute) ? 'Physical' : 'Mental';
  };

  const calculateScores = () => {
    const baseScores: Record<Attribute, number> = {
      STR: 8,
      DEX: 8,
      CON: 8,
      INT: 8,
      WIS: 8,
      CHA: 8,
    };

    Object.entries(answers).forEach(([questionIndex, selectedAnswers]) => {
      const question = questions[parseInt(questionIndex)];
      const category = question.category;

      selectedAnswers.forEach((attribute) => {
        const isPrimary = question.attribute === attribute;
        const isSameCategory = getAttributeCategory(attribute) === category;

        baseScores[attribute] += isPrimary ? 3 : isSameCategory ? 2 : 1;
      });
    });

    setResults(baseScores);
  };

  useEffect(() => {
    const quiz = shuffle(getQuizQuestions()).map((question) => {
      return {
        ...question,
        answers: shuffle(question.answers),
      };
    });

    setQuestions(quiz);
  }, []);

  if (results) {
    return (
      <div>
        {/* <AbilityScores scores={results} /> */}

        {Object.entries(results).map(([attribute, score]) => (
          <div key={attribute}>
            <strong>{attribute}</strong>
            <span>{score}</span>
            <br />
          </div>
        ))}

        {Object.entries(summary).map(([question, answers]) => (
          <div key={question}>
            <strong>{question}</strong>
            <p>
              {answers
                .map((answer, i) =>
                  i === 0
                    ? answer.slice(0, -1)
                    : answer.charAt(0).toLowerCase() + answer.slice(1),
                )
                .join(' and ')}
            </p>
            <br />
          </div>
        ))}

        <Button onClick={() => setResults(null)}>Retake Quiz</Button>
      </div>
    );
  }

  console.log(summary);

  return (
    <div>
      <h1>Character Creation Quiz</h1>
      {questions.map((question, index) => (
        <div
          key={`${index}-${question.text}`}
          style={{ breakBefore: 'always' }}
        >
          <h3>{question.text}</h3>
          <section>
            {question.answers.map((answer) => (
              <>
                <Card key={answer.attribute}>
                  <label>
                    <input
                      type="checkbox"
                      value={answer.attribute}
                      checked={
                        answers[index]?.includes(answer.attribute) || false
                      }
                      onChange={() =>
                        handleAnswerSelect(index, answer.attribute, {
                          q: question.text,
                          a: answer.text,
                        })
                      }
                    />
                    {answer.text}
                  </label>
                </Card>
                <br />
              </>
            ))}
          </section>
        </div>
      ))}
      <Button
        onClick={calculateScores}
        disabled={Object.keys(answers).length < questions.length}
      >
        Submit
      </Button>
    </div>
  );
}
