import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AllPuling = () => {
  const [isMessage, setIsMessage] = useState([])
  const [isValue, setIsValue] = useState('')

  const getMessage = async () => {
    try {
      const { data } = await axios.get('http://localhost:3007/get-messages')
      setIsMessage((item) => [data, ...item])
      // console.log(data)
      await getMessage()
    } catch (error) {
      setTimeout(() => {
        getMessage()
      }, 500)
    }
  }

  useEffect(() => {
    getMessage()
  }, [])

  const sendMessage = async () => {
    await axios.post('http://localhost:3007/new-messages', {
      message: isValue,
      id: new Date().getTime().toString(),
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={isValue}
          onChange={(e) => setIsValue(e.target.value)}
        />
        <button type='submit' onClick={sendMessage}>
          submit
        </button>
        {isMessage.map((item) => {
          return <div key={item.id}>{item.message}</div>
        })}
      </form>
    </div>
  )
}

export default AllPuling
