import { useState } from 'react';
import { Plus, Trash2, Circle, CheckCircle2, Loader2 } from 'lucide-react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      text
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export default function TodoList() {
  const [newTask, setNewTask] = useState('');

  const { data, loading, error } = useQuery(GET_TODOS);
  
  const [addTodo, { loading: adding }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  
  const [toggleTodo] = useMutation(TOGGLE_TODO); 
  
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    await addTodo({ variables: { text: newTask } });
    setNewTask('');
  };

  const handleToggle = (id) => {
    toggleTodo({ variables: { id } });
  };

  const handleDelete = (id) => {
    deleteTodo({ variables: { id } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-orange-500">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error loading tasks! Is the backend running?</div>;
  }

  const todos = data?.getTodos || [];
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {/* Header & Progress */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide mb-1">Your Focus</h2>
          <p className="text-sm text-zinc-400">
            {todos.length === 0 
              ? "Your slate is clean." 
              : `${completedCount} of ${todos.length} tasks complete`}
          </p>
        </div>
      </div>

      {/* Add Task Input */}
      <form onSubmit={handleAddTask} className="mb-8 relative group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs your attention?"
          disabled={adding}
          className="w-full pl-6 pr-14 py-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none text-lg font-light shadow-lg"
        />
        <button
          type="submit"
          disabled={!newTask.trim() || adding}
          className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-orange-500 text-black rounded-xl hover:bg-orange-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_10px_rgb(249,115,22,0.3)]"
        >
          {adding ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-zinc-600 font-light border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50 backdrop-blur-sm">
            Nothing to do. Enjoy the calm.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id}
              className={`group flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-sm border rounded-2xl transition-all duration-200 ${
                todo.completed 
                  ? 'border-zinc-800/50 opacity-60' 
                  : 'border-zinc-800 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgb(249,115,22,0.1)]'
              }`}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <button 
                  onClick={() => handleToggle(todo.id)}
                  className={`shrink-0 transition-colors ${
                    todo.completed ? 'text-orange-500' : 'text-zinc-500 hover:text-orange-400'
                  }`}
                >
                  {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <span className={`text-lg font-light truncate transition-all ${
                  todo.completed ? 'text-zinc-500 line-through' : 'text-white'
                }`}>
                  {todo.text}
                </span>
              </div>
              
              <button
                onClick={() => handleDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-zinc-500 hover:text-red-500 transition-all focus:opacity-100 outline-none rounded-lg hover:bg-red-500/10"
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}