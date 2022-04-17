import axios from 'axios';
import { useEffect, useState } from 'react';
import queryString from 'query-string'
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
    { id: 3, title: 'Todo 3' },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    title_like: '',
  })

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    console.log(paramsString);
    async function getData() {
      await axios.get(`http://js-post-api.herokuapp.com/api/posts?${paramsString}`)
        .then(res => {
          setPostList(res.data.data);
          setPagination(res.data.pagination);
        })
        .catch(err => { throw err; });
    }

    getData();
  }, [filters])

  const handleTodoClick = (todo) => {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  const handleTodoFormSubmit = (formValues) => {
    console.log("formSubmit:", formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo)
    setTodoList(newTodoList);
  }

  const handlePageChange = (newPage) => {
    console.log('New page:', newPage);
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  const handleFiltersChange = (newFilters) => {
    console.log("New Filter:", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
  }

  return (
    <div className="App">
      <h1>React hooks - Clock</h1>

      <Clock />

      {/* <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}

export default App;
