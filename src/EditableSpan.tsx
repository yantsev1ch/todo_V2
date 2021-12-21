import React, {ChangeEvent, FC, memo, useState} from 'react';

type PropsType = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan: FC<PropsType> = memo(({value, onChange}) => {
    console.log("EditableSpan called")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} autoFocus onChange={changeTitleHandler} onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>

})