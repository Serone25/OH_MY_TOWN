const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
      setImageName(file.name);
      setImageType(file.type);
      setImageSize(file.size);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //img = db.Column(db.Unicode)

  fetch('https://api.example.com/data')
  .then(response => {
    if (response.status === 401) {
      // manejar el error
      alert("Error 401: No autorizado");
    } else {
      //procesar la respuesta
    }
  })
  .catch(error => {
    // manejar errores de conexión
  });