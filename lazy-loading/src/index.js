import './index.css'

console.log('index')

const btn = document.querySelector('.btn')
btn.onclick = () => {
  import(/* webpackChunkName: 'dynamic' */'./dynamic.js')
    .then(module => {
      console.log(module.hello('webpack'))
    })
    .catch(err => console.error(err))
}