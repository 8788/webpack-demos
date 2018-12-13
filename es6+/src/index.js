import './index.css'

console.log('index')

window.onload = () => {
  console.log('loaded')
  console.log(new Array(3).fill(1))
}

(async function () {
  const res = await fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed')
  const data = await res.json()
  console.log(data)
})()