import React, { useCallback, useEffect, useState } from 'react';
import Input from './UI/Input';
import Button from './UI/Button';
import storage  from '../API/firebase.js'
import { ref, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

  /*todo: сделать рефактор вывода прикрепленных файлов в отдельный компонент*/

const TodoItem = (props) => {

  /*Стейт хранит информацию об измененных полях компонента при редактировании*/
  const [edited_task, setEdited_task] = useState({name: '', description: '', deadline: ''})

  /*Стейт регулируюий отрисовку кокретного таска или инпутов для изменени таска*/
  const [show_edit, setShow_edit] = useState(false)

  /*Стейт для состояния чекбокса*/  
  const [checked_status, setChecked_status] = useState(true)

  /*стейт для ссылкок на прикрепленные файлы*/
  const [url, setUrl] = useState({})

  /*Функция для переключения отрисовки объектов внутри компонента*/
  const editTask = () => {
    setShow_edit(!show_edit);
  };

  /*функция для изменения статуса чекбокса и отправки информации в родитель для смены статуса таска active/done*/
  const changeStatus = () => {
    setChecked_status(!checked_status)
    props.task_done(props.task_info, checked_status)
  }

  /*Функция отправки данных об изменении компонента в родитель через пропс. 
  Передает в пропс информацию о входящем объекте (конкретном таске) и объект после редактирования */
  const push_edit = (e) => {
    e.preventDefault()
    props.edit_task(props.task_info, edited_task)
    setShow_edit(!show_edit)
  }

  /*функция загружающая файлы из файрбейс и передающая их в стейт url как объекты,
    где ключ - иня файла, а значение - ссылка на файл */
  function show_files(file_names) {
    file_names.forEach((element) => {
      getDownloadURL(ref(storage, element))
      .then(result => setUrl(prevUrl => { return {...prevUrl, [element]: result}}))})
      }

 
  useEffect(() => show_files(props.task_info.attachments), [props.task_info.attachments])

  
  return (
    <div>

        {
        show_edit ? 
        <form action="post">
          <Input 
            type='text'
            placeholder={props.task_info.name}
            onChange={event =>  setEdited_task({...edited_task, name: event.target.value})}
            >New name
          </Input>

          <Input 
            type='text'
            placeholder={props.task_info.description}
            onChange={event => setEdited_task({...edited_task, description: event.target.value})}
            >New description
          </Input>

          <Input 
            type='date'
            placeholder={props.task_info.deadline}
            onChange={event => setEdited_task({...edited_task, deadline: event.target.value})}
            >New deadline
          </Input>

          <Button
            onClick={push_edit}
            >Save changes
          </Button>

        </form>
        
        :

        <div>
        <h1>Task name: {props.task_info.name}</h1>

        <p> Task status: {props.task_info.status}</p>

        <div>Deadline: {props.task_info.deadline}</div>

        <p>Task detales: {props.task_info.description}</p>


       { props.task_info.attachments.length ? 

       <div>
        Attachments: 
          {props.task_info.attachments.map((element) => {
            return <a 
              target="_blank"
              href={url[element]}
            >{element}
            </a>
          })
          }
       </div>
       :
        <p>no attachments</p> 
        }

         
      
        
        <input 
          type="checkbox" 
          onChange={changeStatus} 
        />

        <Button 
          onClick={editTask}
          >Edit task
        </Button>

        <Button 
          onClick={() => {props.deleteTask(props.task_info)}}
          >Delete
        </Button>

        </div>
        }

    </div>
  );
};

export default TodoItem;