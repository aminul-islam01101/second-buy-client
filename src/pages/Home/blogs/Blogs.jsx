/* eslint-disable no-underscore-dangle */
import React from 'react';
import Blog from './Blog';

const Blogs = () => {
    const allBlogs = [
        {
            id: 1,
            img: 'https://i.ibb.co/4Tk8gjq/react.png',
            question: 'What are the different ways to manage a state in a React application?',
            answer: 'The built-in way that React provides for setting component states is by using setState() and adding “local state” to a class. There are several other ways to manage state​s in React, including the use of: 1. Hooks(useCallback,useReducer) 2.React Context API 3.using React Router, One can get all the information you need using useHistory or useLocation. 4.Ussing Library like Zustand, Jotai, and Recoil 5.Redux is used mostly for application state management. ',
        },
        {
            id: 2,
            img: 'https://i.ibb.co/4Tk8gjq/react.png',
            question: 'How does prototypical inheritance work?',
            answer: 'When we read a property from object, and its missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__. ',
        },
        {
            id: 3,
            img: 'https://i.ibb.co/4Tk8gjq/react.png',
            question: 'What is a unit test? Why should we write unit tests?',
            answer: 'Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. The main objective of unit testing is to isolate written code to test and determine if it works as intended. ',
        },
        {
            id: 4,
            img: 'https://i.ibb.co/thyhWcJ/4444.png',
            question: 'React vs. Angular vs. Vue?',
            answer: 'Angular is a front-end framework with lots of components, services, and tools. On Angulars site, you can see that they define Angular as: The modern web developers platform.  It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.React is considered a UI library. They define themselves as:A JavaScript library for building user interfaces.  Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React. Last but not least, Vue.js is, according to its site: A progressive JavaScript framework.Vue.js is developed and led by Evan You, but also it counts on a huge open-source community',
        },
    ];

    return (
        <div className='bg-primary'>
            <div className="grid lg:grid-cols-2 gap-10 container p-20  ">
                {allBlogs?.map((blog) => (
                    <Blog id={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
