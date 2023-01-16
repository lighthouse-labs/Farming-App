import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
// import { action } from "@storybook/addon-actions";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const REMOVING = "REMOVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
      .then(res => transition(SHOW));

  }

  function deleteApp() {
    const interview = {
      student: "",
      interviewer: null
    };
    transition(CONFIRM);
    transition(REMOVING);
    props.cancelInterview(props.id, interview)
      .then(res => transition(EMPTY));

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
          onEdit={() => transition(EDIT) }
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
      {mode === SAVING && <Status status={"Saving"} />}
      {mode === REMOVING && <Status status={"Deleting"} />}
      {mode === CONFIRM && <Confirm
        message={"Are you sure you would like to Delete?"}
        onConfirm={deleteApp}
        onCancel={back}
      />}
    </article>

  );
}
