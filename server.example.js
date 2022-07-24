const server = http.createServer(async (req, res) => {
  
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'))
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(content)
  }
  
  else if (req.method === 'POST') {
    const body = []
     res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    })
    req.on('data', data => {
      const title = Buffer.from(data)
      body.push(title) // console.log(body.toString().split('=')[1].split('+').join(' '))
    })
    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ')
      addNote(title)
      res.end(title)
    })
  }

})
