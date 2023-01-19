# Interview Scheduler

## Functional Requirements

1. Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
2. Data is persisted by the API server using a PostgreSQL database.
3. The client application communicates with an API server over HTTP, using the JSON format.
4. Jest tests are used through the development of the project.

## Project Features

1. Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
2. The days show the number of slots available
3. A user can switch between days and see detailed information
4. Booked and available slots are clearly differentiated
5. A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
6. A user can change the details of an existing interview by pressing the edit icon
7. A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
8. Days display currently remaining spots and show updates after each modification

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Images
Main Page View
!["Main Page View"](https://github.com/RaemeKhatib/Scheduler/blob/master/public/docs/Main%20Page.png?raw=true)
This is the Main View, a user can click on a time slot and see the current appointments booked. 

Editing Existing Appointments
!["Edit An Apppointment"](https://github.com/RaemeKhatib/Scheduler/blob/master/public/docs/Edit%20Appointment.png?raw=true)
A user can click on the edit icon and then change the student name and choose a new interviewer.