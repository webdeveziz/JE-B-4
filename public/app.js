document.addEventListener('click', async (event) => {

  if (event.target.dataset.type === 'remove') {
    await remove(event.target.dataset.id)
    event.target.closest('li').remove()
  }
  
  else if (event.target.dataset.type === 'edit') {
    const {id} = event.target.dataset
    const title = prompt('Введите новое название!')
    if (title) {
      const data = { title, id }
      await edit(data)
      const note = document.querySelector(`[data-id='${id}'`)
      const html = `
      ${title}
      <div>
        <button class="btn btn-primary" data-type="edit" data-id="${id}">Редактировать</button>
        <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
      </div>`
      note.parentElement.parentElement.innerHTML = html
    } else {
      console.log('Все осталось неизменным!')
    }
  }

})



async function edit(data) {
  const stringData = JSON.stringify(data)
  await fetch(`/${stringData}`, {
    method: 'PUT',
    body: stringData
  }) 
}


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}