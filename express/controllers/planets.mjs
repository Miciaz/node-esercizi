let planets = [
    { id: 1, name: "Mercury" },
    { id: 2, name: "Venus" },
    { id: 3, name: "Earth" },
    { id: 4, name: "Mars" },
    { id: 5, name: "Jupiter" },
    { id: 6, name: "Saturn" },
    { id: 7, name: "Uranus" },
    { id: 8, name: "Neptune" },
  ];


  const getAll = (req, res) => {
    res.status(200).json(planets);
  };

  const getOneById = (req, res) => {
    const {id} = req.params
    const planet = planets.find(el => el.id === Number(id))

    res.status(200).json(planet)
}

  const create = (req, res) => {
    const {id, name} = req.body
    const newPlanet = {id , name}
    planets = [...planets, newPlanet]
  
    res.status(201).json({msg:'new planet created'})
  }

  const updateById = (req,res) => {
    const {id} = req.params
    const {name} = req.body
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)
  
    console.log(planets)
    res.status(200).json({msg: 'planet modified'})
  }

  const deleteById = (req, res) => {
    const {id} = req.body
    planets = planets.filter(p => p.id !== Number(id))
  
    res.status(200).json({msg:'planet deleted'})
  }

  export {getAll, getOneById, create, updateById, deleteById}