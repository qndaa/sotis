import ACTION_TYPES from "../actionTypes/tests";

export function createNewQuestion(
  text,
  minChoices,
  maxChoices,
  value,
  correctAnswers,
  answers
) {
  return {
    type: ACTION_TYPES.CREATE_NEW_QUESTION,
    text,
    minChoices,
    maxChoices,
    value,
    correctAnswers,
    answers,
  };
}

export function createNewAnswer(text, identifier) {
  return {
    type: ACTION_TYPES.CREATE_NEW_ANSWER,
    text,
    identifier,
  };
}

export function addNewAnswer(answer) {
  return {
    type: ACTION_TYPES.ADD_NEW_ANSWER,
    answer,
  };
}

export function showSuccessToast() {
  return {
    type: ACTION_TYPES.SHOW_SUCCESS_TOAST,
  };
}

export function closeSuccessToast() {
  return {
    type: ACTION_TYPES.CLOSE_SUCCESS_TOAST,
  };
}

export function fetchAllQuestions() {
  return {
    type: ACTION_TYPES.FETCH_ALL_QUESTIONS,
  };
}

export function setAllQuestions(allQuestions) {
  return {
    type: ACTION_TYPES.SET_ALL_QUESTIONS,
    allQuestions,
  };
}

export function fetchAllSections() {
  return {
    type: ACTION_TYPES.FETCH_ALL_SECTIONS,
  };
}

export function setAllSections(allSections) {
  return {
    type: ACTION_TYPES.SET_ALL_SECTIONS,
    allSections,
  };
}

export function saveSection(title, questions) {
  return {
    type: ACTION_TYPES.SAVE_SECTION,
    title,
    questions,
  };
}

export function saveTest(identifier, sections) {
  return {
    type: ACTION_TYPES.SAVE_TEST,
    identifier,
    sections,
  };
}
