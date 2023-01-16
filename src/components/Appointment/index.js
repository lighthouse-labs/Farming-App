import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
// import { action } from "@storybook/addon-actions";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const REMOVING = "REMOVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW))
      .catch(()=> transition(ERROR_SAVE, true))

  }

  function deleteApp() {
    const interview = {
      student: "",
      interviewer: null
    };
    transition(REMOVING, true);
    props.cancelInterview(props.id, interview)
      .then(res => transition(EMPTY))
      .catch(()=> transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewer={null}
          interviewers={props.interviewers}
          student=""
          onSave={save}
          onCancel={back}
        />}
      {mode === EDIT &&
        <Form
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          student={props.interview.student}
          onSave={save}
          onCancel={back}
        />}
      {mode === SAVING && 
      <Status status={"Saving"} />}
      {mode === ERROR_SAVE && 
      <Error 
      message={"Error in Saving"} 
      onClose={back} />}
      {mode === ERROR_DELETE && <Error 
      message={"Error in Deleting"} 
      onClose={back} />}

      {mode === REMOVING && <Status status={"Deleting"} />}
      {mode === CONFIRM && <Confirm
        message={"Are you sure you would like to Delete?"}
        onConfirm={deleteApp}
        onCancel={back}
      />}
    </article>

  );
}
