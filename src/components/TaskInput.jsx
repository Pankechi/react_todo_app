import React, { useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import storage from '../API/firebase.js';
import { ref, uploadBytes } from "firebase/storage";
import classes from './style/taskInput.module.css'


const TaskInput = (props) => {

  /*создаем хранилище файрбейс*/

 /*Стейт с новым таском*/
  const [new_task, setNew_task] = useState(
    {id: Date.now(), name:" ", deadline: undefined, description: " ", status: "active", attachments: []}
    );


    /*функция забирает данные о файлах из инпута. после этого добавляет имена файлов в стейт нового файла, 
    а сами файлы загружает в стор файрбейса*/
    const getImg = (event) => {
      const files = Array.from(event.target.files)
      const file_names = files.map(element => element.name)
      setNew_task({...new_task, attachments: file_names})
      files.forEach((file) => {
       const file_ref = ref(storage, file.name)
       uploadBytes(file_ref, file)
      })
    }


  /*Функция отправки объекта с новым таском в родительских компонент. 
  Принимает пропсом функцию из родителя, которая будет передавать новый компонент в стейт компонентов*/  
  const push_task = (e) => {
    e.preventDefault();
    props.addNewTask(new_task)
  }
  
  return (
    <form className={classes.new_task_form} action="post">

      <Input 
        onChange={event => {setNew_task({...new_task, name: event.target.value})}} 
        type='text'
        >Task Name
      </Input>

      <Input 
        onChange={event => setNew_task({...new_task, description: event.target.value})}  
        type='textarea'
        >Task Description
      </Input>

      <Input 
        onChange={event => setNew_task({...new_task, deadline: event.target.value})}  
        type='date'
        >Task Deadline
      </Input>

      <Input 
        id='file_input'
        className={classes.file_input}
        onChange={getImg}
        multiple  
        type='file'>
      </Input>

      <div className={classes.form__actions}>

        <label 
          className={classes.file_input_label} 
          for="file_input"
          >
        </label>

        <Button
          className={classes.new_task_button}
          onClick={push_task}
          >Add Task
        </Button>

      </div>

    </form>
  );
};

export default TaskInput;