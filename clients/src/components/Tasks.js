import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Layout from './Layout'

const Fields = () => {

  const [ name, setName ] = useState('')

  const [ list, setList ] = useState([])

  const [ fields, setFields ] = useState([
    { 
      type: 'text', 
      name: 'name'
    }, 
    { 
      type: 'text', 
      name: 'name' 
    }, 
    { 
      type: 'text', 
      name: 'name'
    }, 
    { 
      type: 'text', 
      name: 'name' 
    },
    { 
      type: 'text', 
      name: 'name'
    },
  ])

  const addField = e => {
    e.preventDefault()

    return setFields([
      ...fields, 
      { 
        type: 'text', 
        name: 'name' 
      }
    ])
  }

  const changeHandler = e => {
    e.preventDefault()

    const fields = [...list]

    const { name, value, dataset } = e.target

    const { field } = dataset

    fields[field] = { [name]: value }

    return setList(fields)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const filter = list.filter(el => el !== undefined)

    return axios.post('/api/field/', { name, list: filter })
      .then(res => console.log(res.data))
        .catch(error => console.log(error.response))
  }

  return (
    <div>
      <h5>Добавление полей</h5>
      <form onSubmit={submitHandler}>
        <div>
          <input
          type='text'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Добавьте имя'
          />
        </div>

        <div>
          <input 
          type="checkbox" 
          name="multy" 
          value="true"
          /> Мультисписок
        </div>

        <div>
          <a href='./' onClick={addField}>Добавить новое поле</a>
        </div>

        <div style={{ margin: '2em 0' }}>
          {fields.map((field, index) => (
            <div style={{ marginBottom: '.5em' }}>
              <input
              key={`custom-field-${index}`}
              type={field.type}
              name={field.name}
              onChange={changeHandler}
              placeholder='Вариант'
              data-field={`${index}`}
              />
            </div>
          ))}
        </div>

        <div>
          <button type='submit'>Отправить</button>
        </div>
      </form>

    </div>
  )
}




const Tasks = () => { 
  
  const [ crater, setCrater ] = useState('')

  const [ addCrater, setNewCrater ] = useState({})

  const [ allCrater, setAllCrater ] = useState([])

  const removeCrater = (id) => {
    return axios.delete(`/api/crater/${id}`)
      .then(res => setNewCrater(res.data))
        .catch(error => console.log(error.response))
  }
 
  const submitHandler = e => {
    e.preventDefault()

    return axios.post('/api/crater/', { name: crater })
      .then(res => setNewCrater(res.data))
        .catch(error => console.log(error.response))
  }

  useEffect(() => {
    return axios.get('/api/crater/')
      .then(res => setAllCrater(res.data))
        .catch(err => err.response)
  }, [addCrater])

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div>
          <h5>Добавить воронку</h5>
          <input 
          type='text' 
          name='name' 
          value={crater}
          onChange={e => setCrater(e.target.value)}
          placeholder='Введите название воронки'
          ></input>
        </div>
        <div>
          <button type='submit'>Отправить</button>
        </div>
      </form>

      <ul style={{ marginBottom: '5em' }}>
        {allCrater.map((crater, index) => (
          <li id={crater._id} key={index}>
            {crater.name} <span data-crater={crater._id} onClick={() => removeCrater(crater._id)}>X</span>
          </li>
        ))}
      </ul>

      <Fields />
    </Layout>
  )
}

export default Tasks