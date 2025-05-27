import style from './App.module.css'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react';


function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
      const storedUser = localStorage.getItem('user')
      if(storedUser){
        setUser(JSON.parse(storedUser))
        navigate('/usersList')
      }
  }, [navigate])
  


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password })
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/usersList')
    } catch (error) {
      setMessage('Erro no login: ' + (error.response?.data?.message || 'Verifique os dados'))
    }
  }

  return (
    <div className={style.wrapLogin}>
      <div className={style.wrapImages}></div>
  
      <div className={style.wrapFrom}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          /><br />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          /><br />
          <button type="submit">Entrar</button>
          {message && <p>{message}</p>} {/* Exibe a mensagem de erro se existir */}
        </form>
      </div>
    </div>
  );
  
}

export default App
