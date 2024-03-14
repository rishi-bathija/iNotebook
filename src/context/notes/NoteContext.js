import { createContext } from "react";

// Syntax for creating new context:-
const noteContext = createContext();

export default noteContext;

// Context api is used when multiple components of an app are accessing the same state.
// when a certain state has been created in some sub-component and some other component or the sub-component of the other component of the same app wants to use this state, then it would be difficult to pass this state in all the other components as a prop to reach that particular state of a subcomponent to the other component or subcomponent. So, context api is used to reduce this difficulty
// context api is used through useContext hook

// React context api allows you to easily access data at different levels of component tree, without passing them as a prop to every level 