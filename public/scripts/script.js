
const myEnter = document.getElementById('foo')

myEnter.addEventListener('mouseenter', () => {
    myEnter.style.color = 'red'
})

myEnter.addEventListener('mouseleave', () => {
    myEnter.style.color = ''

})
