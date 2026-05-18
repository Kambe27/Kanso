import { useState } from 'react';
import { Plus, Trash2, Circle, CheckCircle2 } from 'lucide-react';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Embrace simplicity', completed: true },
    { id: 2, text: 'Build the GraphQL backend', completed: false },
    { id: 3, text: 'Deploy Kanso to Vercel', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      {}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-light text-stone-100 tracking-wide mb-1">Your Focus</h2>
          <p className="text-sm text-stone-400">
            {todos.length === 0 
              ? "Your slate is clean." 
              : `${completedCount} of ${todos.length} tasks complete`}
          </p>
        </div>
      </div>

      {}
      <form onSubmit={handleAddTask} className="mb-8 relative">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs your attention?"
          className="w-full pl-6 pr-14 py-4 bg-white border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl text-stone-900 placeholder-stone-300 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-lg font-light"
        />
        <button
          type="submit"
          disabled={!newTask.trim()}
          className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
        </button>
      </form>

      {}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-stone-300 font-light border border-dashed border-stone-200 rounded-2xl">
            Nothing to do. Enjoy the calm.
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id}
              className={`group flex items-center justify-between p-4 bg-white border rounded-2xl transition-all duration-200 ${
                todo.completed 
                  ? 'border-stone-100 shadow-none bg-stone-50/50' 
                  : 'border-stone-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <button 
                  onClick={() => toggleComplete(todo.id)}
                  className={`shrink-0 transition-colors ${
                    todo.completed ? 'text-stone-300' : 'text-stone-300 hover:text-stone-500'
                  }`}
                >
                  {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <span className={`text-lg font-light truncate transition-all ${
                  todo.completed ? 'text-stone-400 line-through' : 'text-stone-700'
                }`}>
                  {todo.text}
                </span>
              </div>
              
              <button
                onClick={() => handleDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-stone-300 hover:text-red-400 transition-all focus:opacity-100 outline-none rounded-lg hover:bg-red-50"
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