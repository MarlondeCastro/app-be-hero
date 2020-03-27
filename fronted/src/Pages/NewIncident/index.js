import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css'

export default function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

   async function handleNewIncident (e){
        e.preventDefault();

        const data = {
            title,
            description,
            value ,
        };

        try {
            await api.post('incidents', data,
            { headers: {
                authorization: ongId,
        }
        })

        history.push('/profile');

        } catch (err) {
            alert('Caso não criado')
        }
    }

    return(
        <div className="newincident-container">
        <div className="content">
            <section>
                 <img src={logoImg} alt=""/>
                 <h1>Cadastrar Novo Caso</h1>
                 <p>Descreva o seu caso detalhadamente para encontrar o seu herói.</p>
 
                 <Link className="back-link" to="/profile">
                 <FiArrowLeft size={16} color='#e02041'/>
                 Voltar para Home
                 </Link>
            </section>
 
            <form onSubmit={handleNewIncident}>
                <input placeholder=
                "Nome Título do Caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea placeholder=
                "Decrição Detalahada"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input placeholder=
                "Valor em R$"
                value={value}
                onChange={e => setValue(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
                
            </form>
        </div>
    </div>
    )
};