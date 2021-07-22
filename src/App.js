import React, {useState, useEffect, useRef} from 'react';

const App = props => {
    const [n, setN] = useState(0);
    const onClick = () => {
        setN(n + 1);
    };

    // 使用useEffect模拟componentDidMount生命周期函数
    // userEffect 第二个参数传入空数组即可完成
    useEffect(() => {
        console.log("模拟componentDidMount")
    }, []);

    
    // 使用useEffect模拟componentUpdate生命周期函数
    // userEffect 第二个参数传入想要监控的state变量即可
    // 如果要监控所有变量的变化，那么不需要传入第二个参数
    useEffect(() => {
        console.log("模拟componentUpdate")
    }, [n]);



    return (
        <div>
            {n}
            <button onClick={onClick}>+1</button>
        </div>
    )
}

const Child = (props) => {
    
    // 使用useEffect模拟componentWillUnMount生命周期函数
    // userEffect 括号里面方一个函数，此函数再return一个函数，即可模拟完成componentWillUnMount生命周期函数
    useEffect(() => {
        return () => {
            console.log('组件被销毁')
        }
    })

    return (
        <div>Child</div>
    )
}


// useRef使用方法
// 因为useState再set的时候，并不会更新原来的数据，而是生成一个新的数据，对原来的数据进行覆盖
// 而useRef则是再更新数据的时候，会直接更新原来的旧的数据
function RefUsage() {
    const nRef = useRef(0);

    // log函数，隔一秒后，打印出nRef的值
    const log = () => setTimeout(
        () => console.log(`n: ${nRef.current}`, 1000)
    )
    
    // 先点log再点+1， 如果是useEffect，那么会打赢出0，因为更新的不是原来的数据
    // 但是useRef的场合，就会打印出1， 因为更新的是同一个数据
    return (
        <div>
            <button onClick={() => (nRef.current += 1)}> +1 </button>
            <button onClick={log}> log </button>
        </div>
    )
}


// useContext使用方法
// useContext就是一个组件全局变量，声明以后，被这个全局变量标签包裹起来的，里面所有的子组件，都可以通过
// React.useContext(声明的全局变量名字) 来获取到useContext这个全局变量里面的成员，从而进行值的修改
// 如下的ChildA点击后会变红，ChildB点击后会变蓝
const themeContext = React.createContext(null);

function useContextUsage() {
    const [theme, setTheme] = React.useState("red");
    return (
        <themeContext.Provider value= {{ theme, setTheme}}>
            <div>
                <p>{theme}</p>
                <div>
                    <ChildA />
                </div>
                <div>
                    <ChildB />
                </div>
            </div>
        </themeContext.Provider>
    )
}

function ChildA() {
    const {setTheme} = React.useContext(themeContext);
    return (
        <div>
            <button onClick={() => setTheme("red")}>
                red
            </button>
        </div>
    )
}

function ChildB() {
    const {setTheme} = React.useContext(themeContext);
    return (
        <div>
            <button onClick={() => setTheme("blue")}>
                blue
            </button>
        </div>
    )
}


export default App