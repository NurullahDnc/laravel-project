import React from 'react'
import {Link} from 'react-router-dom'

export default function Register() {
  return (
    <div className='login-register-container' >
    <form className='form-signin'>
      <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
      <h1 className="h3 mb-3 fw-normal">Hemen Kayıt ol</h1>

      <div className="form-floating">
        <input type="email" className="form-control" id="floatingInput" placeholder="Ad Soyad" />
        <label for="floatingInput">Ad Soyad</label>
      </div>

      <div className="form-floating my-2">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email Adres</label>
      </div>

      <div className="form-floating ">
        <input type="password" className="form-control" id="floatingPassword" placeholder="sifre" />
        <label for="floatingPassword">Sifre</label>
      </div>

      <div className="form-floating my-2">
        <input type="email" className="form-control" id="floatingInput" placeholder="sifre" />
        <label for="floatingInput">Sifre Tekrar</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">Kayıt Ol</button>
      <Link className='mt-3 d-block' to="/Login">Giris yap </Link>
      <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
    </form>
  </div>
  )
}
