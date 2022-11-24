import React, { useCallback, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import TaskInput from '../components/TaskInput';
import { useState } from 'react';
import dayjs from 'dayjs';


const TaskPage = () => {

  const [tasks, setTasks] = useState([
    {id:1, name:"Task 1", deadline: "2022-12-01", description: "do something", status: "active", attachments: ['test.docx']},
    {id:2, name:"Task 2", deadline: "2022-12-01", description: "do something", status: "active", attachments: ['test.docx']},
    {id:3, name:"Task 3", deadline: "2022-12-01", description: "do something", status: "active", attachments: ['test.docx']},
    {id:4, name:"Task 4", deadline: "2022-12-01", description: "do something", status: "active", attachments: ['test.docx']},
    {id:5, name:"Task 5", deadline: "2022-12-01", description: "do something", status: "active", attachments: ['test.docx']},
    {id:6, name:"Task 6", deadline: "2022-10-01", description: "do something", status: "active", attachments: ['test.docx']},
  ]);

  /*Функция разворачивает новый объект, полученный из дочернего компонента Input, в стейт тасков*/
  const addNewTask = (another_task) => {
    setTasks([another_task, ...tasks])
  };

  /*Функция фильтрует массив тасков удаляя конкретнй таск по id, 
    полученному из дочернего элемента TodoItem*/
  const deleteTask = (task) => {
    setTasks(tasks.filter(t => t.id !== task.id))
  };


  /*Функция предобразовывает массив тасков, заменяя поля конкретного таска на отредактированные.
  Принимает занные о таске из пропсов и отредактированный таск*/
  const editTask = (task_info, edited_task) => {
    setTasks(tasks.map(element => {
      if (element.id == task_info.id) {
        return {...element, name: edited_task.name,
         description: edited_task.description,
          deadline: edited_task.deadline}
        } else {
          return element
        }
      }
    )  )    
  };

  /*Функция меняет статус таска после простановки чекбокса*/
  const task_done = (done_task_info, checked_status) => {
    setTasks(tasks.map(element => {
      if(element.id == done_task_info.id && checked_status == true) {
        return {...element, status:'done'};
      } else {
        return {...element, status:'active'}
      }
    }))
  } 


  // /*функция сравнивает поле deadline из массива тасков с текущей датой и определяет, 
  //   пропущен ли срок выполнения или нет. Если пропущен - меняет статус таска*/    
  const dateCheck = (task_list) => {
    task_list.forEach(element => {
      if (element.deadline < dayjs().format('YYYY-MM-DD') && element.status != 'done') {
        element.status = 'task overdue';
        }
      }
    )
  };


  useCallback(
     dateCheck(tasks), [tasks]
  );


  return (
    <div>
      <TaskInput addNewTask={addNewTask}></TaskInput>
      
      {
        tasks.map((task) => {
        return <TodoItem 
          key={task.id} 
          task_info={task} 
          task_done={task_done}
          edit_task={editTask} 
          deleteTask={deleteTask}>
        </TodoItem>
      })
      }
      
    </div>
  );
  
};

export default TaskPage;