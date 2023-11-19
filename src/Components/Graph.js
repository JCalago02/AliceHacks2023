import React, {useState, useEffect, useRef} from 'react';
import GaleShapely from "../Class Structures/GaleShapely.js";
import { createProgramCircles, createApplicantCircles, animateAll } from '../Utils/CanvasDraw.js';
import { calculateVelocity } from '../Utils/Formulas.js';
import { initializeProgramList, initializeStudentList } from '../Utils/InitializeData.js';
import './Graph.css';





// circle: { currCoord, goalCoord, velocity, radius, color}
/*
    Whenever we click the button: changeGoal coord, calculate velocity, then call animateallCircles

*/

export default function Graph() {
    const canvasRef = useRef(null);
    
    // initialize the list of programs and students
    const programList = initializeProgramList();
    const studentList = initializeStudentList();
    const [gs, setGs] = useState(new GaleShapely(programList, studentList));

    const [programCircles, setProgramCircles] = useState(createProgramCircles());
    const [applicantCircles, setApplicantCircles] = useState(createApplicantCircles());
    // initialize all of the circle objects
    
    useEffect(() => {
        const canvas = canvasRef.current;
        var circleList = programCircles.concat(applicantCircles);
        circleList.forEach((circle) => {
            circle.velocity = calculateVelocity(circle);
        })
        
        animateAll(canvas, circleList); 
    }, [programCircles, applicantCircles]);

    function handleSkipIteration() {
        const currApplicant = gs.currentApplicant;
        while (gs.currentApplicant.id === currApplicant.id) {
            handleGsIteration();
        }
    }

    function handleGsIteration() {
        const res = gs.nextIteration();
        const studentId = res[0];
        const programId = res[1];
        const rejectedId = res[2];
        const wasRejected = res[3];
        // const program = gs.findProgram(programId);
        // const seats = program.getSeats();
        const newStudentPos = new Map();
        
        setProgramCircles(programCircles.map((circle) => {
            var newColor = "blue";
            if (circle.id === programId) {
                // calculate the new positions of all still inside the seat list
                const program = gs.findProgram(programId);
                const seats = program.getSeats()
                for (let i = 0; i < seats.length; i++) {
                    const newPos = {
                        x : circle.curr.x + 50 + (20 * i) + 10,
                        y : circle.curr.y,
                    };
                    newStudentPos.set(seats[i], newPos);
                }

                if (wasRejected) {
                    newColor = "red";
                } else {
                    newColor = "green";
                }
            }
            return {
                ...circle,
                color : newColor
            };
        }));

        setApplicantCircles(applicantCircles.map((circle) => {
            var newColor = "gray";
            var newGoal = circle.goal;
            var newCurr = circle.curr;
            if (circle.curr.x !== circle.goal.x || circle.curr.y !== circle.goal.y) {
                newCurr = {
                    x : circle.goal.x,
                    y : circle.goal.y
                }
            }
            if (newStudentPos.has(circle.id)) {
                newGoal = newStudentPos.get(circle.id);
            }
            if (circle.id === studentId) {
                if (wasRejected) {
                    newColor = "red";
                } else {
                    newColor = "green";
                }
            }
            if (circle.id === rejectedId) {
                newGoal = circle.startPos;
            }
            return {
                ...circle,
                color : newColor,
                goal : newGoal,
                curr : newCurr
            };
        }))
    }
    return (
        <div className='center-container'>
            <canvas className='canvas-elem' ref = {canvasRef} width={1600} height={1080}></canvas>
            <div className='button-container'>
                <button className='next-button' onClick={handleGsIteration}>Next Iteration</button>
                <button className='next-button' onClick={handleSkipIteration}>Next Individual</button>
            </div>
           
        </div>
    )
}


/*
    distribute all nodes across the canvas
    each node should have a property of x and y
    iterate the GaleShapely algorithm forward by one iteration
    calculate new x and y

    calculate distance between new x and y and then create a movement rate based on 60 frames
    move along slope line for 60 frames

    highlight individual that is going to move
    highlight program they attempted a match with
    draw line to signify outcome

    move any relevant nodes

    what we need: 
        id of the node that is the current applicant
        id of the program that is the program we are applying to
        id of the node that was kicked out
    what we will do:
        draw a line between the current applicant and the proposed program
        update the state of all of the nodes in the program's seats array
        move the rejected node back to its original position

*/