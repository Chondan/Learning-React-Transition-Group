import React, { useState } from 'react';
import { Transition, CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

const duration = 300;
const defaultStyles = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
const transitionStyles = {
    entering: { opacity: 0.5, color: "blue" },
    entered: { opacity: 1, color: "red" },
    exiting: { opacity: 0.5, color: "black" },
    exited: { opacity: 0 },
}
const Fade = ({ in: inProp }) => (
    <Transition 
    in={inProp}
    timeout={duration}
    unmountOnExit={true}
    appear={true}
    >
    {state => (
        <div style={{...defaultStyles,...transitionStyles[state]}}>
            I'm a fade Transition!
        </div>
    )}

    </Transition>
);
function Box({ className }) {
    return (
        <div className={"box " + className}></div>
    );
}
function MovingBox({ in:inProp }) {
    return (
        <Transition
        in={inProp}
        // timeout={300}
        mountOnEnter={false}
        unmountOnExit={false}
        onEnter={() => alert("The box is going to move to the right")}
        onExit={() => alert("The box is going to move to the left")}
        exit={true}
        enter={true}
        addEndListener={(node, done) => {
            node.addEventListener('transitionend', (e) => {
                done(e);
            }, false);
        }}
        >
            {state => (
                <Box className={`box-${state}`} />
            )}
        </Transition>
    );
}
function MovingBoxCSSTransition() {
    const [inProp, setInProp] = useState(false);
    function handleClick(e) {
        setInProp(!inProp);
    }
    return (
        <div>
            <CSSTransition
            in={inProp}
            timeout={2000}
            classNames="msg"
            onEntering={(node) => console.log(node.classList)}
            onEntered={() => console.log("entered")}
            >
                <div className="msg"></div>
            </CSSTransition>
            <button onClick={handleClick}>{inProp ? "Left" : "Right"}</button>
        </div>

    );
}
function PopupMessage() {
    const [showMessage, setShowMessage] = useState(false);
    const [showButton, setShowButton] = useState(true);
    return (
        <div className="popup-msg">
            {showButton && <button onClick={() => setShowMessage(!showMessage)}>Show Message</button>}
            <CSSTransition
            in={showMessage}
            timeout={300}
            classNames="message-container"
            onEnter={() => setShowButton(false)}
            onExited={() => {
                setTimeout(() => {
                    setShowButton(true);
                }, 200);
            }}
            >
                <div className="message">
                    <p>Animated alert message</p>
                    <p>This alert message is being transitioned in and out of the DOM.</p>
                    <button onClick={() => setShowMessage(!showMessage)}>Close</button>
                </div>
            </CSSTransition>
        </div>
    );
}
function Warp() {
    const [hide, setHide] = useState(false);
    return (
        <React.Fragment>
            <CSSTransition
            in={!hide}
            timeout={200}
            classNames={{
                appear: 'warp',
                appearActive: 'warp-active-appear',
                appearDone: 'warp-done-appear',
                enter: 'warp-enter',
                enterActive: 'warp-active-enter',
                enterDone: 'warp-done-enter',
                exit: 'warp-exit',
                exitActive: 'warp-active-exit',
                exitDone: 'warp-done-exit',
            }}
            unmountOnExit
            >
                <div>warp</div>
            </CSSTransition>
            <button style={{ margin: "2px"}} onClick={() => setHide(!hide)}>{ hide ? "Show" : "Hide"}</button>
        </React.Fragment>
    );
}
function SwitchTransitionExample1() {
    const [state, setState] = useState(false);
    return (
        <SwitchTransition>
            <CSSTransition
            key={state ? "Goodbye, world!" : "Hello, world!"}
            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
            classNames="fade"
            >
                <button onClick={() => setState(state => !state)}>
                    {state ? "Goodbye, world!" : "Hello, world!"}
                </button>
            </CSSTransition>
        </SwitchTransition>
    );
}
const modes = ["out-in", "in-out"];
function SwitchTransitionExample2() {
    const [mode, setMode] = useState("out-in");
    const [state, setState] = useState(true);
    return (
        <div className="mode-example">
            <div className="label">Mode: </div>
            <div className="modes">
                <form>
                    {modes.map(m => {
                        return (
                            <React.Fragment key={m}>
                            <input type="radio" name="mode" checked={m === mode} value={m} onChange={e => setMode(e.target.value)} />
                            <label>{m}</label>
                            </React.Fragment>
                        );
                    })}
                </form>
            </div>
            <div className="main">
                    <SwitchTransition mode={mode}>
                        <CSSTransition
                        key={state}
                        addEndListener={(node, done) => node.addEventListener("transitionend", done ,false)}
                        classNames="example-btn"
                        >
                            <button onClick={() => setState(state => !state)}>{state ? "Hello, world!" : "Goodbye, world!"}</button>
                        </CSSTransition>
                    </SwitchTransition>
            </div>
            
        </div>
    );
}
function TodoList() {
    const [items, setItems] = useState([
        { id: uuidv4(), text: "Buy eggs" },
        { id: uuidv4(), text: "Pay bills" },
        { id: uuidv4(), text: "Invite friends over" },
        { id: uuidv4(), text: "Fix the TV" },
    ]);
    function addItemHandler(e) {
        const todoItem = prompt("Enter your task", "...task");
        if (!todoItem) {
            return;
        }
        setItems([...items, { id: uuidv4(), text: todoItem }]);
    }
    return (
        <div className="todo-list-container">
            <ul className="todo-list">
                <TransitionGroup component={null}>
                    {items.map(({ id, text }) => (
                        <CSSTransition 
                        key={id}
                        timeout={500}
                        classNames="item"
                        >
                            <li className="item">
                                <button onClick={() => setItems(items.filter(item => item.id !== id))}>X</button>
                                <span>{text}</span>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ul>
            <button onClick={addItemHandler}>Add Item</button>
        </div>
    );
    
    
}

function App() {
    const [show, setShow] = useState(true);
    const [GoMove, setGoMove] = useState(false);
    return (
        <div>
            <h1>Transition</h1>
            <Fade in={show} />
            <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            <MovingBox in={GoMove} />
            <button onClick={() => setGoMove(!GoMove)}>{GoMove ? "Left" : "Right"}</button>
            <h1>CSSTransition</h1>
            <Warp />
            <MovingBoxCSSTransition />
            <PopupMessage />
            <h1>SwitchTransition</h1>
            <SwitchTransitionExample1 />
            <SwitchTransitionExample2 />
            <h1>TransitionGroup</h1>
            <TodoList />
        </div>
    );
    
}

export default App;