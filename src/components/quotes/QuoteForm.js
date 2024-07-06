import React, { Fragment, useRef, useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [inputAuthor, setInputAuthor] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const textInputRef = useRef();

  useEffect(() => {
    // Check if inputs are filled to determine form validity
    setIsFormValid(inputAuthor.trim() !== "" && textInputRef.current.value.trim() !== "");
  }, [inputAuthor, textInputRef]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredAuthor = inputAuthor;
    const enteredText = textInputRef.current.value.trim();

    if (!enteredAuthor || !enteredText) {
      return;
    }
   

    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    // Clear inputs after submission
    setInputAuthor("");
    textInputRef.current.value = "";
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const handleInputChangeAuthor = (e) => {
    setInputAuthor(e.target.value);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message="Are you sure you want to leave? All your data will be lost!"
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          onSubmit={submitFormHandler}
          className={classes.form} // Apply form styles from CSS module
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label className={classes.label} htmlFor="author">
              Author
            </label>
            <input
              className={classes.input} // Apply input styles from CSS module
              type="text"
              id="author"
              value={inputAuthor}
              onChange={handleInputChangeAuthor}
            />
          </div>
          <div className={classes.control}>
            <label className={classes.label} htmlFor="text">
              Text
            </label>
            <textarea
              className={classes.textarea} // Apply textarea styles from CSS module
              id="text"
              rows="5"
              ref={textInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button
              type="submit"
              className={`${"btn"}`}
              onClick={finishEnteringHandler}
              disabled={!isFormValid}
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
