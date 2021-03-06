import { useRouter } from 'next/router'
import { useRef } from 'react'

function registerPage(props) {
    const router = useRouter();
    const type = router.query.register
    const codeInputRef = useRef();
    const nameInputRef = useRef();
    const mailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    
    let checkId= async e=>{
        const res = await fetch("http://localhost:3000/api/return/"+codeInputRef.current.value)
        const r = await res.json();
        return r
    }
    

    let submitHandler = async e => {
        e.preventDefault();
        if (passwordConfirmInputRef.current.value != passwordInputRef.current.value) {
            alert(`Las contraseñas no son iguales`)
        }else if(await checkId()){
            alert(`Ya hay un usuario con este ID`)
        }else {
            let newUser = {
                id: codeInputRef.current.value,
                name: nameInputRef.current.value,
                mail: mailInputRef.current.value,
                password: passwordInputRef.current.value,
                userType: type
            }
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }
            let r = await fetch("http://localhost:3000/api/user/" + codeInputRef.current.value, config)
            console.log(r)
            alert(`Se agrego el nuevo `+type)
           
            router.push('/home')
        }

    }

    return <form onSubmit={submitHandler}>
        <h1>register Page</h1>
        <h2> {type}</h2>
        <h2></h2>
        <div>
            <label>Nombre del {type}</label>
            <br></br>
            <input type='text' required id='name' placeholder='Nombre' ref={nameInputRef} ></input>
        </div>
        <div>
            <label>Codigo del {type}</label>
            <br></br>
            <input type='text' required id='code' placeholder='Nombre' ref={codeInputRef} ></input>
        </div>
        <div>
            <label>Mail del {type}</label>
            <br></br>
            <input type='email' required placeholder='Mail' ref={mailInputRef}></input>
        </div>
        <div>
            <label>contraseña del {type}</label>
            <br></br>
            <input type='password' required placeholder='contraseña' ref={passwordInputRef}></input>
        </div>
        <div>
            <label>Confirmar contraseña</label>
            <br></br>
            <input type='password' required placeholder='contraseña' ref={passwordConfirmInputRef}></input>
        </div>
        <div>
            <button>Registrar {type}</button>
        </div>

    </form>

}

export default registerPage;