const example = [
    {id:1, text: 'BTS concert',completed:true},
]
function App() {
    const [toDo, toDoSet] = React.useState(example);
    const [input, inputSet] = React.useState('');
    function changeInput(event) {
        inputSet(event.target.value);
    }
    function submit(event) {
        event.preventDefault();
        if (input.trim() === '')
            return;
        toDoSet([...toDo, {id: Date.now(), text: input.trim(), completed: false}]);
        inputSet('');
    }
    function toDoDel(id) {
        toDoSet(toDo.filter(todo => todo.id!== id));
    }
    function toDoComplete(id) {
        toDoSet(
            toDo.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            })
        );
    }
    return (
        <div className="container">
            <h1 className="title">List</h1>
            <form onSubmit={submit} className="add-form">
                <input
                    type="text"
                    placeholder="Добавить событие"
                    value={input}
                    onChange={changeInput}
                    maxlength="50"
                />
                <button type="submit">Добавить</button>
            </form>
            <ul className="list">
                {toDo.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toDoComplete(todo.id)}
                        />
                        <label>{todo.text}</label>
                        <button onClick={() => toDoDel(todo.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
