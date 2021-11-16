import { takeLatest, call, put } from "redux-saga/effects";
import ACTION_TYPES from "../actionTypes/tests";
import testService from "../../../services/tests/TestService";
import PAGE_ROUTES from "../../../pageRoutes";
import {
  addNewAnswer,
  setAllQuestions,
  setAllSections,
  showSuccessToast,
} from "../actions/tests";

export function* createNewAnswer({ type, text, identifier }) {
  try {
    const answer = yield call(testService.createNewAnswer, {
      text,
      identifier,
    });
    if (answer.data) {
      console.log(answer);
      yield put(addNewAnswer(answer.data));
    } else {
      throw new Error("Could not create answer!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* getAllQuestions({ type }) {
  try {
    const allQuestions = yield call(testService.getAllQuestions);
    if (allQuestions.data) {
      console.log(allQuestions);
      yield put(setAllQuestions(allQuestions.data));
    } else {
      throw new Error("Could not get all questions!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* fetchAllSections({ type }) {
  try {
    const allSections = yield call(testService.getAllSections);
    if (allSections.data) {
      console.log(allSections);
      yield put(setAllSections(allSections.data));
    } else {
      throw new Error("Could not get all sections!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* saveSection({ type, title, questions }) {
  try {
    const section = yield call(testService.saveSection, {
      title,
      identifier: title,
      questions,
    });
    if (section.data) {
      console.log(section);
      // yield put(setAllQuestions(allQuestions.data));
      window.location.reload();
    } else {
      throw new Error("Could not save section!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* saveTest({ type, identifier, sections }) {
  try {
    const test = yield call(testService.saveTest, {
      identifier,
      sections,
    });
    if (test.data) {
      console.log(test);
      // yield put(setAllQuestions(allQuestions.data));
      window.location.reload();
    } else {
      throw new Error("Could not save section!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* createNewQuestion({
  type,
  text,
  minChoices,
  maxChoices,
  value,
  correctAnswers,
  answers,
}) {
  try {
    const question = yield call(testService.createNewQuestion, {
      text,
      min_choices: minChoices,
      max_choices: maxChoices,
      time_dependant: false,
      identifier: 1,
      value,
      correct_answers: correctAnswers,
      all_answers: answers,
    });
    if (question.data) {
      console.log(question);
      yield put(showSuccessToast());
      window.location.reload();
    } else {
      throw new Error("Could not create question!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(ACTION_TYPES.CREATE_NEW_ANSWER, createNewAnswer);
  yield takeLatest(ACTION_TYPES.CREATE_NEW_QUESTION, createNewQuestion);
  yield takeLatest(ACTION_TYPES.FETCH_ALL_QUESTIONS, getAllQuestions);
  yield takeLatest(ACTION_TYPES.SAVE_SECTION, saveSection);
  yield takeLatest(ACTION_TYPES.SAVE_TEST, saveTest);
  yield takeLatest(ACTION_TYPES.FETCH_ALL_SECTIONS, fetchAllSections);
}
