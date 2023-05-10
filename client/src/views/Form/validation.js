const validation = (info) => {
    const errors = {};
    if(info.name.length < 4 || info.name.length > 20){
        errors.name = "El nombre de la actividad debe tener entre 4 y 20 cracteres"
    };
    if(/\d/.test(info.name)){
        errors.name = "El nombre de  la actividad no puede contenet números"
    }
    if (info.countries.length < 1){
        errors.countries = "Debe seleccionar por lo menos un país"
    }
    let durationInMinutes = parseInt(info.duration.substring(0,2))*60
    if(durationInMinutes > 720){
        errors.duration = "La duracion no puede ser mayor a 12:00 horas"
    }
    if(durationInMinutes < 1){
        errors.duration = "La duracion no puede ser menor a 01:00 hora"
    }    
    return errors;
}

export default validation;