// console.log('client side javascript file loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = 'loading...'
    msg2.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            
            if(data.err) {
                msg1.textContent = (data.err)
                
            }else{
                msg1.textContent = (data.location)
                msg2.textContent = (data.forcast)
              
            }
        })
    })
})