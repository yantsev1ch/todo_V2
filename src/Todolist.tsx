import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';

export type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
}

export const Todolist: FC<PropsType> = ({
                                            id,
                                            title,
                                            tasks,
                                            removeTask,
                                            changeFilter,
                                            addTask,
                                            changeStatus,
                                            filter,
                                            removeTodolist
                                        }) => {
    const onAllClickHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);
    const removeTodolistHandler = () => removeTodolist(id);
    const addTaskHandler = (value: string) => addTask(value, id)

    return (
        <div>
            <h3>{title}
            <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    tasks.map(task => {
                        const onClickHandler = () => removeTask(task.id, id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.currentTarget.checked, id)
                        }

                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}