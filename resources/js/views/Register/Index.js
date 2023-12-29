import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

//*kayıt olma sayfası
export default function Register() {

  const handleSubmit = () => {
    alert("tıklandı")
  }

  return (
    <div className='login-register-container' >
      <form className='form-signin'>
        <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Hemen Kayıt ol</h1>
        {/*formik= form'u gonderme kontol etme */}
        <Formik
          //belirtigimiz degerleri giricez
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
          }}
          //buttona tıklandıdıgında calısacak func, verileri gonderme, ozelikleri tanımlandı
          onSubmit={handleSubmit}
          validationSchema={
            //yup = formda kosul saglıyor, zorunlu - 8 karakter olacak
            Yup.object().shape({
              email: Yup
                .string()
                //email formatında olacak olmaz ise, hata mesajı ver
                .email('Email Formatı Hatalı')
                .required('Email Zorunludur'),
              name: Yup.string().required(' Ad Soyad Zorunludur'),
              password: Yup.string().required('Şifre Zorunludur'),
              password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmiyor')
            })
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            isValid,
            isSubmitting,
            touched
          }) => (
            <div>
              <div className="form-floating">
                <input type="email"
                  className="form-control"
                  placeholder="Ad Soyad"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur}
                />
                {(errors.name && touched.name) && <p>{errors.name} </p>}

                <label htmlFor="floatingInput">Ad Soyad</label>
              </div>

              <div className="form-floating my-2">
                <input type="email" className="form-control"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange('email')}
                />
                {(errors.email && touched.email) && <p>{errors.email} </p>}

                <label htmlFor="floatingInput">Email Adres</label>
              </div>

              <div className="form-floating ">
                <input type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="sifre"
                  value={values.password}
                  onChange={handleChange('password')}
                />
                {(errors.password && touched.password) && <p>{errors.password} </p>}

                <label htmlFor="floatingPassword">Sifre</label>
              </div>

              <div className="form-floating my-2">
                <input type="password"
                  className="form-control"
                  placeholder="Sifre Tekrarı"
                  value={values.password_confirmation}
                  onChange={handleChange('password_confirmation')}
                />
                {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation} </p>}

                <label htmlFor="floatingInput">Sifre Tekrar</label>
              </div>

              <button onClick={handleSubmit}
                // butonda tıklandıgı zaman disabled yap
                disabled={!isValid || isSubmitting}
                className="w-100 btn btn-lg btn-primary"
                type="button">Kayıt Ol</button>

            </div>

          )}
        </Formik>
        <Link className='mt-3 d-block' to="/Login">Giris yap </Link>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </div>
  )
}
