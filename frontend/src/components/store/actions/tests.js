import ACTION_TYPES from "../actionTypes/tests";

export function addQuestion(type, text, min_choices, max_choices, value) {
  return {
    type: ACTION_TYPES.ADD_QUESTION,
    text,
    min_choices,
    max_choices,
    value,
  };
}

export function createNewAnswer(type, text, identifier) {
  return {
    type: ACTION_TYPES.CREATE_NEW_ANSWER,
    text,
    identifier,
  };
}
